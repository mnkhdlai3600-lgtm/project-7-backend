import { model, models, Schema } from "mongoose";

const FoodSchema = new Schema(
  {
    food_name: { type: String, required: true },
    food_price: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
  },
  { timestamps: true },
);

const FoodModel = models.Foods || model("Foods", FoodSchema);
export default FoodModel;
