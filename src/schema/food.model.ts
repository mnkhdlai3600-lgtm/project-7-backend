import { model, models, Schema } from "mongoose";

const foodSchema = new Schema(
  {
    food_name: { type: String, required: true },
    food_price: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, require: true, ref: "Category" },
  },
  { timestamps: true },
);

const FoodModel = models.Foods || model("Foods", foodSchema);
export default FoodModel;
