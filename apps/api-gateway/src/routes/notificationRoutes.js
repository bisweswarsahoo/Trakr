import express from "express";
import {
	getNotifications,
	sendNotification,
	markAsRead,
} from "../controllers/notificationController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.post("/send", protect, sendNotification);
router.put("/:id/read", protect, markAsRead);

export default router;
