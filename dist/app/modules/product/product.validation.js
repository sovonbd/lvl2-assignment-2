"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
// Define the Variant schema
const variantValidation = zod_1.z.object({
    type: zod_1.z.string().nonempty("Variant type is required."),
    value: zod_1.z.string().nonempty("Variant value is required."),
});
// Define the Inventory schema
const inventoryValidation = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .int()
        .nonnegative("Quantity must be a non-negative integer."),
    inStock: zod_1.z
        .boolean()
        .refine((val) => val === true || val === false, "In-stock status is required."),
});
// Define the Product schema
const productValidation = zod_1.z.object({
    name: zod_1.z.string().nonempty("Product name is required."),
    description: zod_1.z.string().nonempty("Product description is required."),
    price: zod_1.z.number().nonnegative("Product price must be a non-negative number."),
    category: zod_1.z.string().nonempty("Product category is required."),
    tags: zod_1.z.array(zod_1.z.string().nonempty()).nonempty("Product tags are required."),
    variants: zod_1.z
        .array(variantValidation)
        .nonempty("Product variants are required."),
    inventory: inventoryValidation,
});
exports.productValidation = productValidation;
