import { RENDER_LIST } from "@vue/compiler-core";
import Gigs from "../Models/gig_model.js";
import Category from "../Models/category_model.js";
import {
  getStandardError,
  getStandardResponse,
} from "../Utils/standard_response.js";

export const getAllGigs = async (req, res, next) => {
  try {
    const filters = {
      ...(req.query.limit && { limit: req.query.limit }),
      ...(req.query.search && {
        title: { $regex: req.query.search, $option: i },
      }),
      ...(req.query.cat && { category: req.query.cat }),
      ...(req.query.max ||
        (req.query.min && {
          price: {
            ...(req.query.min && { $gt: req.query.min }),
            ...(req.query.max && { $lt: req.query.max }),
          },
        })),
    };

    const gigs = await Gigs.find(filters);
    return res
      .status(200)
      .send(getStandardResponse(200, "All gigs", gigs, req));
  } catch (error) {
    next(error);
  }
};

export const getGig = async (req, res) => {
  try {
    const gig = await Gigs.findById(req.params.id);
    if (!gig)
      return res.status(401).send(getStandardError("Gig not found", 401, req));

    return res
      .status(200)
      .send(getStandardResponse(200, "Gig Found", gig, req));
  } catch (error) {
    next(error);
  }
};

export const createGig = async (req, res, next) => {
  try {
    if (!req.isSeller) {
      return res
        .status(403)
        .send(getStandardError("You are not authenticated", 403, req));
    }
    const gig = new Gigs({
      userId: req.userId,
      ...req.body,
    });
    await gig.save();
    return res
      .status(201)
      .send(getStandardResponse(201, "Gig created successfully", gig, req));
  } catch (error) {
    next(error);
  }
};

export const updateGig = async (req, res, next) => {
  try {
    const gigUpdated = await Gigs.findById(req.params.id);

    if (gigUpdated.userId.toString() != req.userId) {
      res
        .status(401)
        .send(getStandardError("You dont have permission", 401, req));
    }

    const gig = await Gigs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res
      .status(201)
      .send(getStandardResponse(201, "Gig was updated", gig, req));
  } catch (error) {
    next(error);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gigId = req.params.id;
    const gig = await Gigs.findById(gigId);
    if (req.userId !== gig.userId.toString()) {
      return res
        .status(401)
        .send(getStandardError("You do not have permission", 401, req));
    }
    await Gigs.findByIdAndDelete(gigId);
    return res
      .status(201)
      .send(getStandardResponse(201, "Gig was Deleted", [], req));
  } catch (error) {
    next(error);
  }
};
