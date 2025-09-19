import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getDashboardData);

export default router;
