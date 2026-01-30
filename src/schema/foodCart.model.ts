import { model, models, Schema } from "mongoose";

enum FoodOrderStatusEnum {
  PENDING = "pending",
  PREPARING = "preparing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

const FoodCartItemSchema = new Schema(
  {
    food: {
      type: Schema.Types.ObjectId,
      ref: "Foods",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const FoodCartSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    foodOrderitems: [FoodCartItemSchema],

    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum), // ⭐ fix
      default: FoodOrderStatusEnum.PENDING,
    },
  },
  { timestamps: true },
);

export default models["food-carts"] || model("food-carts", FoodCartSchema);
