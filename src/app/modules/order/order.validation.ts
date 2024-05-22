import { z } from "zod";

// Define the order validation
const orderValidation = z.object({
  email: z.string().email("Invalid email format"),
  productId: z.string().nonempty("ProductId is required"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

// Export the schema
export { orderValidation };
