import { model, models, Schema } from "mongoose";

const foodCategorySchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId },
    categoryName: { type: String, required: true },
  },
  { timestamps: true },
);

export default model("food-categories", foodCategorySchema);
