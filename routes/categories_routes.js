import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../Controllers/category_controller.js";
import { verifyToken } from "../Utils/methods.js";

const router = express.Router();

router.get("/all", getCategories);
router.post("/create", verifyToken, createCategory);
router.delete("/delete/:id", verifyToken, deleteCategory);

export default router;
