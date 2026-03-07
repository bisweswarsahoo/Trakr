import express from "express";
import {
	getShops,
	createShop,
	updateShop,
} from "../controllers/shopController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getShops);
router.post("/", protect, createShop);
router.put("/:id", protect, updateShop);

export default router;
