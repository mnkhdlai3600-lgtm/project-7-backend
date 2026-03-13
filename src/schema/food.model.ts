import { Schema, model, models } from "mongoose";

const FoodSchema = new Schema(
  {
    foodName: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "food-categories",
      required: true,
    },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default models.Foods || model("Foods", FoodSchema);
