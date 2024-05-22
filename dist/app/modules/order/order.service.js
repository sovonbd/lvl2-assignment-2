"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const mongoose_1 = __importDefault(require("mongoose"));
// create order and update product
const createOrderInDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Create the order in the database
        const result = yield order_model_1.Order.create([orderData], { session });
        // Use aggregation to join Order with Product collection
        const productData = yield order_model_1.Order.aggregate([
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
        if (productData.length === 0) {
            throw new Error("Product not found");
        }
        // Extract the product information and order quantity
        const { productInfo } = productData[0];
        const { quantity: orderQuantity } = orderData;
        if (productInfo.inventory.quantity < orderQuantity) {
            throw new Error("Insufficient quantity available in inventory");
        }
        // Calculate the new product quantity and determine the inStock status
        const newProductQuantity = productInfo.inventory.quantity - orderQuantity;
        const newInStockStatus = newProductQuantity > 0;
        // Update the product quantity and inStock status in the product collection
        yield product_model_1.Product.findByIdAndUpdate(productInfo._id, {
            $set: {
                "inventory.quantity": newProductQuantity,
                "inventory.inStock": newInStockStatus,
            },
        }, { new: true, session });
        yield session.commitTransaction();
        session.endSession();
        return result[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
// get all orders
const getOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return result;
});
// get orders by email
const getOrdersFromDBByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({ email });
    return result;
});
exports.OrderService = {
    createOrderInDB,
    getOrdersFromDB,
    getOrdersFromDBByEmail,
};
