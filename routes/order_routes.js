import {
  createOrders,
  deleteOrders,
  getOrders,
} from "../Controllers/orders_controller.js";
import { verifyToken } from "../Utils/methods.js";
import express from "express";
const router = express.Router();

router.get("/all", verifyToken, getOrders);
router.post("/create/:id", verifyToken, createOrders);
router.delete("/delete/:id", verifyToken, deleteOrders);
export default router;
