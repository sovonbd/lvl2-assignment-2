import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

// define the order Schema
const orderSchema = new Schema<TOrder>({
  email: { type: String, required: [true, "Email is required"] },
  productId: { type: String, required: [true, "ProductId is required"] },
  price: { type: Number, required: [true, "Price is required"] },
  quantity: { type: Number, required: [true, "Quantity is required"] },
});

// create the order model
export const Order = model<TOrder>("Order", orderSchema);
