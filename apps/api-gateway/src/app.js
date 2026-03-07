import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import protect from "./middlewares/authMiddleware.js";
import { createProxy } from "./middlewares/gatewayProxy.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ─── Auth routes (handled directly by Node.js) ───
app.use("/api/auth", authRoutes);

// ─── User profile routes (handled directly by Node.js) ───
app.use("/api/users", userRoutes);

// ─── Shop management routes (handled directly by Node.js) ───
app.use("/api/shops", shopRoutes);

// ─── Notification routes (handled directly by Node.js) ───
app.use("/api/notifications", notificationRoutes);

// ─── Gateway proxy routes (forwarded to FastAPI) ───
// All requests below are authenticated, then forwarded to FastAPI
// with internal service headers (X-Service-Key, X-User-ID)
app.use("/api/expenses", protect, createProxy("/api/v1/expenses"));
app.use("/api/income", protect, createProxy("/api/v1/income"));
app.use("/api/categories", protect, createProxy("/api/v1/categories"));
app.use("/api/reports", protect, createProxy("/api/v1/reports"));
app.use("/api/dashboard", protect, createProxy("/api/v1/dashboard"));

// Health check
app.get("/", (req, res) => {
	res.json({
		service: "Trakr API Gateway",
		status: "running",
		version: "2.0.0",
	});
});

app.get("/health", (req, res) => {
	res.json({ status: "ok" });
});

export default app;
