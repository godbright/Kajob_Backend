import { response } from "express";
import User from "../Models/user_model.js";
import { createToken, hashPassword, verifyPassword } from "../Utils/methods.js";
import {
  getStandardError,
  getStandardResponse,
} from "../Utils/standard_response.js";

export const register = async (req, res, next) => {
  try {
    const { password, ...others } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      password: hashedPassword,
      ...others,
    });
    await newUser.save();
    res
      .status(201)
      .send(getStandardResponse(200, "Registration was successfull", [], req));
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    //check if the user exists by using their username
    const userFound = await User.findOne({ UserName: req.body.username });

    if (!userFound) {
      return res
        .status(400)
        .send(getStandardError("user Doesnt exist", 400, req));
    } else {
      //check hash the user password

      const isValid = await verifyPassword(
        req.body.password,
        userFound.password
      );

      //if the user is valid
      if (isValid) {
        const { password, ...others } = userFound._doc;

        const token = await createToken(
          userFound.role,
          userFound.isSeller,
          userFound.id
        );

        return res
          .status(200)
          .cookie("access_token", token, { httpOnly: true })
          .send(getStandardResponse(200, "Logged in", others, req));
      } else {
        //if the password is not valid
        return res
          .status(400)
          .send(getStandardError("Incorrect email or password", 400, req));
      }
    }
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  //to logo out clear the cookies
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send(getStandardResponse(200, "User has looged out", [], req));
};
