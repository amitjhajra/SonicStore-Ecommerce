import express from "express";
import { createOrder, getMyOrders, getAllOrders, cancelOrder } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

// Admin Routes
router.get("/all", protect, admin, getAllOrders);
router.put("/:id/cancel", protect, admin, cancelOrder);

export default router;