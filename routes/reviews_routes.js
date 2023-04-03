import {
  createReviews,
  deleteReviews,
  getReviews,
} from "../Controllers/reviews_controller.js";
import express from "express";
import { verifyToken } from "../Utils/methods.js";

const router = express.Router();

router.get("/all/:id", getReviews);
router.post("/createReview/:id", verifyToken, createReviews);
router.delete("/deleteReview/:id", verifyToken, deleteReviews);
export default router;
