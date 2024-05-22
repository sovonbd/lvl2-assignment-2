"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// product api routes
router.post("/", product_controller_1.ProductController.createProduct);
router.get("/", product_controller_1.ProductController.getProducts);
router.get("/:id", product_controller_1.ProductController.getSingleProduct);
router.put("/:id", product_controller_1.ProductController.updateSingleProduct);
router.delete("/:id", product_controller_1.ProductController.deleteSingleProduct);
exports.ProductRouter = router;
