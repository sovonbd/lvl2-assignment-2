import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

// api routes
router.post("/create-product", ProductController.createProduct);
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getSingleProduct);
router.put("/:id", ProductController.updateSingleProduct);
router.delete("/:id", ProductController.deleteSingleProduct);

export const ProductRouter = router;
