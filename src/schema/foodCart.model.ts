import { model, Schema } from "mongoose";

enum FoodOrderStatusEnum {
  PENDING = "pending",
  PREPARING = "preparing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

const foodCartSchema = new Schema(
  {
    food: { type: Schema.Types.ObjectId, required: true, ref: "Foods" },
    quantity: { type: Number, required: true },
  },
  { _id: false },
);

const foodCartModel = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    foodOrderitems: [foodCartSchema],
    status: {
      type: String,
      enum: FoodOrderStatusEnum,
      default: FoodOrderStatusEnum.PENDING,
    },
  },
  { timestamps: true },
);

export default model("food-carts", foodCartModel);
