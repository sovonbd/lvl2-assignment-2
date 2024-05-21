import { Request, Response } from "express";
import { productValidation } from "./product.validation";
import { ProductService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    // data validation
    const productDataValidation = productValidation.parse(productData);
    const result = await ProductService.createProductDB(productDataValidation);
    res.status(200).json({
      success: true,
      mesage: "Product is created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something is wrong",
      data: error,
    });
  }
};

export const ProductController = {
  createProduct,
};
