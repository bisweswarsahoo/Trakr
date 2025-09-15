import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import expenseRoutes from "./routes/expenseRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/expenses", expenseRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
	res.send("Trakr API is running");
});

export default app;
