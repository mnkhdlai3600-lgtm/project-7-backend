import { model, models, Schema } from "mongoose";

const foodCategorySchema = new Schema(
  {
    categoryName: { type: String, required: true },
    foodIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Foods",
      },
    ],
  },
  { timestamps: true },
);

export default models["food-categories"] ||
  model("food-categories", foodCategorySchema);
