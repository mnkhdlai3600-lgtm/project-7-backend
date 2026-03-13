import { Response, Request } from "express";
import foodCartModel from "../../schema/foodCart.model";

const getAllOrderController = async (req: Request, res: Response) => {
  try {
    const allOrders = await foodCartModel
      .find()
      .populate("user_id", "-password")
      .populate("foodOrderitems.food")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: allOrders,
    });
  } catch (error) {
    console.error("GET_ALL_ORDERS_ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getAllOrderController;
