"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
// Define the Variant schema
const variantSchema = new mongoose_1.Schema({
    type: { type: String, required: [true, "Variant type is required."] },
    value: { type: String, required: [true, "Variant value is required."] },
});
// Define the Inventory schema
const inventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: [true, "Quantity is required."] },
    inStock: { type: Boolean, required: [true, "In-stock status is required."] },
});
// Define the Product schema
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, "Product name is required."] },
    description: {
        type: String,
        required: [true, "Product description is required."],
    },
    price: { type: Number, required: [true, "Product price is required."] },
    category: { type: String, required: [true, "Product category is required."] },
    tags: {
        type: [String],
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
exports.Product = (0, mongoose_1.model)("Product", productSchema);
