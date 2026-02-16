import { Response, Request } from "express";
import foodCartModel from "../../schema/foodCart.model";

const getAllOrderController = async (req: Request, res: Response) => {
  try {
    const allOrders = await foodCartModel.find();
    res.status(200).json({ data: allOrders });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getAllOrderController;
