import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || "");
    console.log("connected");
  } catch (error) {
    console.log("error", error);
  }
};
