import { Response, Request } from "express";
import foodCartModel from "../../schema/foodCart.model";

const getOrderedFoodController = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orderedFood = await foodCartModel.findOne({
      user_id,
    });

    if (!orderedFood) {
      return res
        .status(404)
        .json({ message: "No ordered food found for this user" });
    }

    res.status(200).json({ data: orderedFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getOrderedFoodController;
