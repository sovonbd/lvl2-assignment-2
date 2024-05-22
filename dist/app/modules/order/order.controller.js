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
exports.OrderController = void 0;
const order_validation_1 = require("./order.validation");
const order_service_1 = require("./order.service");
// create a order controller
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order: orderData } = req.body;
        // data validation
        const orderDataValidation = order_validation_1.orderValidation.parse(orderData);
        const result = yield order_service_1.OrderService.createOrderInDB(orderDataValidation);
        res.status(200).json({
            success: true,
            mesage: "Order created successfully",
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
// get all and email query data controller
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // retrive orders based on email query
        const { email } = req.query;
        if (email) {
            const result = yield order_service_1.OrderService.getOrdersFromDBByEmail(email);
            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found.",
                    data: [],
                });
            }
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully for user email!",
                data: result,
            });
        }
        else {
            // retrive all orders
            const result = yield order_service_1.OrderService.getOrdersFromDB();
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something is wrong",
            data: error,
        });
    }
});
exports.OrderController = {
    createOrder,
    getOrders,
};
