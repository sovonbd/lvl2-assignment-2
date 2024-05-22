import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import mongoose from "mongoose";

// create order and update product
const createOrderInDB = async (orderData: TOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create the order in the database
    const result = await Order.create([orderData], { session });

    // Use aggregation to join Order with Product collection
    const productData = await Order.aggregate([
      {
        $match: { _id: result[0]._id },
      },
      {
        $addFields: {
          productIdObj: { $toObjectId: "$productId" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productIdObj",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
    ]).session(session);

    // console.log("Product Data:", productData);

    if (productData.length === 0) {
      throw new Error("Product not found");
    }

    // Extract the product information and order quantity
    const { productInfo } = productData[0];
    const { quantity: orderQuantity } = orderData;

    if (productInfo.inventory.quantity < orderQuantity) {
      throw new Error("Not enough product quantity available");
    }

    // Calculate the new product quantity and determine the inStock status
    const newProductQuantity = productInfo.inventory.quantity - orderQuantity;
    const newInStockStatus = newProductQuantity > 0;

    // Update the product quantity and inStock status in the product collection
    await Product.findByIdAndUpdate(
      productInfo._id,
      {
        $set: {
          "inventory.quantity": newProductQuantity,
          "inventory.inStock": newInStockStatus,
        },
      },
      { new: true, session } // Ensure the session is used here
    );

    await session.commitTransaction();
    session.endSession();

    return result[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

const getOrdersFromDBByEmail = async (email: string) => {
  const result = await Order.findOne({ email: email });
  return result;
};

export const OrderService = {
  createOrderInDB,
  getOrdersFromDB,
  getOrdersFromDBByEmail,
};
