import express from "express";
import multer from "multer";
import { getProducts, getProductById, getCategories, createProduct, deleteProduct } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getProducts);
router.get("/categories/all", getCategories);
router.get("/:id", getProductById);

// Admin routes
router.post("/", protect, admin, upload.single("image"), createProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;