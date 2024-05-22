import { Request, Response } from "express";
import { orderValidation } from "./order.validation";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    // data validation
    const orderDataValidation = orderValidation.parse(orderData);
    const result = await OrderService.createOrderInDB(orderDataValidation);
    res.status(200).json({
      success: true,
      mesage: "Order created successfully",
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

const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    if (email) {
      const result = await OrderService.getOrdersFromDBByEmail(email);
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: result,
      });
    }

    const result = await OrderService.getOrdersFromDB();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
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

// const getOrdersByEmail = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.params;

//     const result = await OrderService.getOrdersFromDBByEmail(email);
//     res.status(200).json({
//       success: true,
//       message: "Orders fetched successfully for user email!",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message || "Something is wrong",
//       data: error,
//     });
//   }
// };

export const OrderController = {
  createOrder,
  getOrders,
};
