import cors from "cors";
import { configDotenv } from "dotenv";
import express, { Application, Request, Response } from "express";
import { connectToMongoDB } from "./mongoDB";
import foodRouter from "./router/food.router";
import authenticationRouter from "./router/authentication.router";
import foodCartRouter from "./router/food-order.router";
import foodCategoryModel from "./schema/foodCategory.model";
import categoryRouter from "./router/category.router";

configDotenv();

const app: Application = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/foods", foodRouter);
app.use("/food-carts", foodCartRouter);
app.use("/food-category", categoryRouter);
app.use("/authentication", authenticationRouter);

const startServer = async () => {
  try {
    await connectToMongoDB();
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Server start error ", err);
    process.exit(1);
  }
};

startServer();
