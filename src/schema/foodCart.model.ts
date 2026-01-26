import { model, Schema } from "mongoose";

const foodCartSchema = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "food-cart",
      required: true,
    },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    food_id: { type: Schema.Types.ObjectId, ref: "Food", required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true },
);

export default model("food-cart", foodCartSchema);
