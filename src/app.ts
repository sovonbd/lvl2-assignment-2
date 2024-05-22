import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRouter } from "./app/modules/product/product.route";
import { OrderRouter } from "./app/modules/order/order.route";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// default api
app.use("/api/products", ProductRouter);
app.use("/api/orders", OrderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
