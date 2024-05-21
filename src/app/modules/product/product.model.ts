import { model, Schema } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

// Define the Variant schema
const variantSchema = new Schema<TVariant>({
  type: { type: String, required: [true, "Variant type is required."] },
  value: { type: String, required: [true, "Variant value is required."] },
});

// Define the Inventory schema
const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: [true, "Quantity is required."] },
  inStock: { type: Boolean, required: [true, "In-stock status is required."] },
});

// Define the Product schema
const productSchema = new Schema<TProduct>({
  name: { type: String, required: [true, "Product name is required."] },
  description: {
    type: String,
    required: [true, "Product description is required."],
  },
  price: { type: Number, required: [true, "Product price is required."] },
  category: { type: String, required: [true, "Product category is required."] },
  tags: {
    type: String,
    enum: ["computer", "peripherals", "wireless", "ergonomic"],
    required: [true, "Product tag is required."],
  },
  variants: {
    type: [variantSchema],
    required: [true, "Product variants are required."],
  },
  inventory: {
    type: inventorySchema,
    required: [true, "Product inventory is required."],
  },
});

// Create the Product model
export const Product = model<TProduct>("Product", productSchema);
