import { createServer } from "http";
import app from "./app.js";
import pool from "./config/db.js";
import { initSocket } from "./utils/socketManager.js";

const PORT = process.env.PORT || 5000;

// Test PostgreSQL connection before starting
async function startServer() {
	try {
		const result = await pool.query("SELECT NOW()");
		console.log("PostgreSQL connected at:", result.rows[0].now);
	} catch (err) {
		console.error("PostgreSQL connection failed:", err.message);
		console.warn("Server will start anyway — some features may not work.");
	}

	const httpServer = createServer(app);

	// Initialize Socket.io for real-time features
	const io = initSocket(httpServer);
	console.log("Socket.io initialized");

	httpServer.listen(PORT, () => {
		console.log(`Trakr API Gateway running on http://localhost:${PORT}`);
		console.log(
			`FastAPI service URL: ${process.env.FASTAPI_SERVICE_URL || "http://localhost:8000"}`,
		);
	});
}

startServer();
