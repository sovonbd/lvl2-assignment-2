import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { ProductRouter } from "./app/modules/product/product.route";
import { OrderRouter } from "./app/modules/order/order.route";

const app: Application = express();

// middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// api routes
app.use("/api/products", ProductRouter);
app.use("/api/orders", OrderRouter);

// default route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// middleware to handle all other incorrect routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
