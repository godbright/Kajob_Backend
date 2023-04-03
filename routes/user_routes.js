import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../Controllers/users_controller.js";
import { verifyToken } from "../Utils/methods.js";
const router = express.Router();

router.get("/getUsers", getUsers);
router.get("/single/:id", getUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/update/:id", verifyToken, updateUser);

export default router;
