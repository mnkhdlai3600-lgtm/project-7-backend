import { model, models, Schema } from "mongoose";

type Food = {
  food_name: string;
  food_description: string;
  food_price: string;
  back_drop_img: string;
  poster_img: string;
};

const foodSchema = new Schema<Food>(
  {
    food_name: { type: String, required: true },
    food_description: { type: String, required: true },
    food_price: { type: String, required: true },
    back_drop_img: { type: String, required: true },
    poster_img: { type: String, required: true },
  },
  { timestamps: true },
);

const FoodModel = models.Food || model("Food", foodSchema);
export default FoodModel;
