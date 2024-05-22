import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderInDB = async (orderData: TOrder) => {
  const productData = await Product.aggregate([
    {
      $lookup: {
        from: "product",
        localField: "productId",
        foreignField: "_id",
        as: "productInfo",
      },
    },
  ]);

  console.log(productData);

  const result = await Order.create(orderData);
  return result;
};
