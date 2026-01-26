import cors from "cors";
import { configDotenv } from "dotenv";
import express, { Application, Request, Response } from "express";
import { connectToMongoDB } from "./mongoDB";
import { userRouter } from "./router";
import foodRouter from "./router/food.router";
import foodCart from "./router/food-cart.router";

configDotenv();

const app: Application = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/food", foodRouter);
app.use("/food-cart", foodCart);

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
