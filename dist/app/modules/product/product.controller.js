"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_validation_1 = require("./product.validation");
const product_service_1 = require("./product.service");
// creat-product controller
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productData } = req.body;
        // data validation
        const productDataValidation = product_validation_1.productValidation.parse(productData);
        const result = yield product_service_1.ProductService.createProductDB(productDataValidation);
        res.status(200).json({
            success: true,
            mesage: "Product is created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something is wrong",
            data: error,
        });
    }
});
// get all products controller
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        if (searchTerm) {
            const result = yield product_service_1.ProductService.searchProductInDB(searchTerm);
            res.status(200).json({
                success: true,
                mesage: "Products matching search term fetched successfully!",
                data: result,
            });
        }
        else {
            const result = yield product_service_1.ProductService.getProductsFromDB();
            res.status(200).json({
                success: true,
                mesage: "Products fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something is wrong",
            data: error,
        });
    }
});
// get single product controller
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: productId } = req.params;
        const result = yield product_service_1.ProductService.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            mesage: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something is wrong",
            data: error,
        });
    }
});
// update single product controller
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: productId } = req.params;
        const { product: productData } = req.body;
        const result = yield product_service_1.ProductService.updateSingleProductFromDB(productId, productData);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something is wrong",
            data: error,
        });
    }
});
// delete single product controller
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: productId } = req.params;
        const result = yield product_service_1.ProductService.deleteSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            mesage: "Product deleted successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something is wrong",
            data: error,
        });
    }
});
exports.ProductController = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};
