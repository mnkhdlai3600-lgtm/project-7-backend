import { Schema, model, models } from "mongoose";

const FoodSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    ingredients: [String],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default models.Foods || model("Foods", FoodSchema);
