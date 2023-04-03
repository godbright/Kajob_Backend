import express from "express";
import {
  createGig,
  deleteGig,
  getAllGigs,
  getGig,
  updateGig,
} from "../Controllers/gig_controller.js";
import { verifyToken } from "../Utils/methods.js";

const router = express.Router();

router.get("/all", getAllGigs);

router.post("/createGig", verifyToken, createGig);
router.post("/updateGig/:id", verifyToken, updateGig);

router.get("/getGig/:id", getGig);

router.delete("/deleteGig/:id", verifyToken, deleteGig);

export default router;
