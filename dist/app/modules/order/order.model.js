"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
// define the order Schema
const orderSchema = new mongoose_1.Schema({
    email: { type: String, required: [true, "Email is required"] },
    productId: { type: String, required: [true, "ProductId is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    quantity: { type: Number, required: [true, "Quantity is required"] },
});
// create the order model
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
