import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRouter } from "./app/modules/product/product.route";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
