import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

// order api routes
router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);

export const OrderRouter = router;
