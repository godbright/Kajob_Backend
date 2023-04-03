import Order from "../Models/order_model.js";
import Gig from "../Models/gig_model.js";
import {
  getStandardError,
  getStandardResponse,
} from "../Utils/standard_response.js";
export const getOrders = async (req, res, next) => {
  try {
    const order = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
    });
    return res.send(getStandardResponse(200, "All orders", order, req));
  } catch (error) {
    next(error);
  }
};
export const createOrders = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    const order = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      price: gig.price,
      sellerId: gig.userId,
      buyerId: req.userId,
    });

    order.save();
    res.send(getStandardResponse(201, "Order created", [], req));
  } catch (error) {
    next(error);
  }
};
export const deleteOrders = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (req.userId !== order.buyerId) {
      res
        .status(401)
        .send(getStandardError("You dont have permission", 401, req));
    }
    await Order.findByIdAndDelete(req.params.id);
    return res
      .status(201)
      .send(getStandardResponse(201, "Order deleted", [], req));
  } catch (error) {
    next(error);
  }
};
