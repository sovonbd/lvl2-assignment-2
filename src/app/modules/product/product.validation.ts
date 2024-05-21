import { z } from "zod";

// Define the Variant schema
const variantValidation = z.object({
  type: z.string().nonempty("Variant type is required."),
  value: z.string().nonempty("Variant value is required."),
});

// Define the Inventory schema
const inventoryValidation = z.object({
  quantity: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer."),
  inStock: z
    .boolean()
    .refine(
      (val) => val === true || val === false,
      "In-stock status is required."
    ),
});

// Define the Product schema
const productValidation = z.object({
  name: z.string().nonempty("Product name is required."),
  description: z.string().nonempty("Product description is required."),
  price: z.number().nonnegative("Product price must be a non-negative number."),
  category: z.string().nonempty("Product category is required."),
  tags: z.enum(["computer", "peripherals", "wireless", "ergonomic"]),
  variants: z
    .array(variantValidation)
    .nonempty("Product variants are required."),
  inventory: inventoryValidation,
});

export { productValidation };
