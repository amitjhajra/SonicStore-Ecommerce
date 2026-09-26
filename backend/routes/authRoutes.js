import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/authController.js";
import { protect,admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile); // "protect" runs first to check the token

export default router;
