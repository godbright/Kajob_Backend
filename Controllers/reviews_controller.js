import Review from "../Models/reviews.model.js";
import {
  getStandardError,
  getStandardResponse,
} from "../Utils/standard_response.js";

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.id });
    return res
      .status(200)
      .send(getStandardResponse(200, "All review", reviews, req));
  } catch (error) {
    next(error);
  }
};

export const createReviews = async (req, res, next) => {
  try {
    const gigId =  req.params.id;
    const review = new Review({ userId: req.userId, gigId:gigId, ...req.body });
    await review.save();
    return res
      .status(201)
      .send(getStandardResponse(201, "Review was created", review, req));
  } catch (error) {
    next(error);
  }
};
export const deleteReviews = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res
        .status(404)
        .send(getStandardError("Review not found", 404, req));
    }

    if (req.userId != review.userId.toString()) {
      return res
        .status(401)
        .send(getStandardError("You don't have permission", 401, req));
    }

    await Review.findByIdAndDelete(req.params.id);

    return res
      .status(201)
      .send(getStandardResponse(201, "Review deleted", [], req));
  } catch (err) {
    next(err);
  }
};
