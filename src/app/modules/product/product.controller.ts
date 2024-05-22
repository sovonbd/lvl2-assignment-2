import { Request, Response } from "express";
import { productValidation } from "./product.validation";
import { ProductService } from "./product.service";

// creat-product controller
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

// get all products controller
const getProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    if (searchTerm) {
      const result = await ProductService.searchProductInDB(
        searchTerm as string
      );
      res.status(200).json({
        success: true,
        mesage: "Products matching search term fetched successfully!",
        data: result,
      });
    } else {
      const result = await ProductService.getProductsFromDB();
      res.status(200).json({
        success: true,
        mesage: "Products fetched successfully!",
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something is wrong",
      data: error,
    });
  }
};

// get single product controller
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id: productId } = req.params;

    const result = await ProductService.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      mesage: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something is wrong",
      data: error,
    });
  }
};

// update single product controller
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id: productId } = req.params;
    const { product: productData } = req.body;
    const result = await ProductService.updateSingleProductFromDB(
      productId,
      productData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something is wrong",
      data: error,
    });
  }
};

// delete single product controller
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id: productId } = req.params;
    const result = await ProductService.deleteSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      mesage: "Product deleted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something is wrong",
      data: error,
    });
  }
};

export const ProductController = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
