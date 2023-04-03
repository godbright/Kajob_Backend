import User from "../Models/user_model.js";
import { verifyToken } from "../Utils/methods.js";
import {
  getStandardError,
  getStandardResponse,
} from "../Utils/standard_response.js";

export const getUsers = async (req, res, next) => {
  try {
    const user = await User.find().select("-password");
    res.status(200).send(getStandardResponse(200, "Users list", user, req));
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res
      .status(200)
      .send(getStandardResponse(200, "User found", user, req));
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send(getStandardError("User not found", 404, req));
    }

    if (req.userId !== user._id.toString()) {
      return res
        .status(401)
        .send(
          getStandardError("You can only update your information", 401, req)
        );
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    return res
      .status(200)
      .send(getStandardResponse(200, "User info Updated", updatedUser, req));
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    //validate the token
    const user = await User.findById(req.params.id);

    if (req.userId != user._id.toString()) {
      return res
        .status(200)
        .send(getStandardError("You can delete your own account", 403, req));
    } else {
      await User.findByIdAndDelete(req.params.id);
      return res
        .status(201)
        .send(getStandardResponse(201, "User deleted", [], req));
    }
  } catch (error) {
    next(error);
  }
};
