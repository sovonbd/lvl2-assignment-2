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
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
// create product
const createProductDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(productData);
    return result;
});
// get all the products
const getProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
// get single product
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
// update single product
const updateSingleProductFromDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    return result;
});
// delete single product
const deleteSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
// search product
const searchProductInDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, "i"); // 'i' makes the search case-insensitive
    const result = yield product_model_1.Product.find({
        $or: [
            { name: { $regex: regex } },
            { description: { $regex: regex } },
            { tags: { $in: [regex] } }, // Search for the term within tags array
        ],
    });
    return result;
});
exports.ProductService = {
    createProductDB,
    getProductsFromDB,
    getSingleProductFromDB,
    updateSingleProductFromDB,
    deleteSingleProductFromDB,
    searchProductInDB,
};
