"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const zod_1 = require("zod");
// Define the order validation
const orderValidation = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    productId: zod_1.z.string().nonempty("ProductId is required"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    quantity: zod_1.z.number().int().positive("Quantity must be a positive integer"),
});
exports.orderValidation = orderValidation;
