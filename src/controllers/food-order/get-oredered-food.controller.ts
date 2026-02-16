import { Response, Request } from "express";
import foodCartModel from "../../schema/foodCart.model";

const getOrderedFoodController = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      res.status(400).json({ message: "Хэрэглэгчийн ID шаардлагатай" });
      return;
    }

    const orderedFood = await foodCartModel
      .findOne({ user_id })
      .populate({
        path: "foodOrderitems.food",
        model: "Foods",
      })
      .exec();

    if (!orderedFood) {
      res
        .status(404)
        .json({ message: "Энэ хэрэглэгч дээр захиалга олдсонгүй" });
      return;
    }

    res.status(200).json({ data: orderedFood });
  } catch (error) {
    console.error("Алдаа гарлаа:", error);
    res.status(500).json({ message: "Дотоод алдаа гарлаа" });
  }
};

export default getOrderedFoodController;
