import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getStandardError } from "./standard_response.js";
export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const createToken = async (role, isSeller, userId) => {
  const user = {
    isSeller: isSeller,
    role: role,
    id: userId,
  };
  return await jwt.sign(user, process.env.jwt_secret);
};

export const verifyToken = async (req, res, next) => {
  if (!req.cookies.access_token) {
    return res.status(400).send(getStandardError("token not found", 404, req));
  }

  await jwt.verify(
    req.cookies.access_token,
    process.env.jwt_secret,
    (err, payload) => {
      if (err) {
        return res
          .status(400)
          .send(getStandardError("token is invalid", 404, req));
      }
      //check if the id provided is equat to the usr id
      req.role = payload.role;
      req.userId = payload.id;
      req.isSeller = payload.isSeller;
      next();
    }
  );
};
