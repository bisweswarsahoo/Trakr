import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const FASTAPI_URL = process.env.FASTAPI_SERVICE_URL || "http://localhost:8000";
const INTERNAL_SERVICE_KEY = process.env.INTERNAL_SERVICE_KEY || "";

// Default timeout for proxy requests (15 seconds)
const PROXY_TIMEOUT = parseInt(process.env.PROXY_TIMEOUT) || 15000;
// Max retries on network failures
const MAX_RETRIES = parseInt(process.env.PROXY_MAX_RETRIES) || 2;

/**
 * Creates a gateway proxy middleware that forwards requests to FastAPI.
 * The middleware:
 *  1. Authenticates the user via the upstream auth middleware
 *  2. Forwards the request to FastAPI with internal service headers
 *  3. Returns the FastAPI response to the client
 *
 * @param {string} basePath - The FastAPI base path to forward to (e.g., "/api/v1/expenses")
 */
export const createProxy = (basePath) => {
	return async (req, res) => {
		const targetUrl = `${FASTAPI_URL}${basePath}${req.path === "/" ? "" : req.path}`;
		const method = req.method.toLowerCase();

		let lastError = null;

		for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
			try {
				const config = {
					method,
					url: targetUrl,
					headers: {
						"Content-Type": req.headers["content-type"] || "application/json",
						"X-Service-Key": INTERNAL_SERVICE_KEY,
						"X-User-ID": String(req.user.id),
					},
					timeout: PROXY_TIMEOUT,
					// Preserve query parameters
					params: req.query,
					// Ensure we get the raw response
					validateStatus: () => true,
				};

				// Attach body for methods that support it
				if (["post", "put", "patch"].includes(method) && req.body) {
					config.data = req.body;
				}

				const response = await axios(config);

				// Forward status code and response data
				return res.status(response.status).json(response.data);
			} catch (err) {
				lastError = err;

				// Only retry on network/timeout errors, not on application errors
				if (
					err.code === "ECONNREFUSED" ||
					err.code === "ETIMEDOUT" ||
					err.code === "ECONNRESET"
				) {
					console.warn(
						`Gateway proxy attempt ${attempt + 1} failed for ${targetUrl}:`,
						err.code,
					);
					if (attempt < MAX_RETRIES) {
						// Exponential backoff: 500ms, 1000ms
						await new Promise((resolve) =>
							setTimeout(resolve, 500 * (attempt + 1)),
						);
						continue;
					}
				}
				break;
			}
		}

		console.error("Gateway proxy error:", lastError?.message || lastError);

		if (lastError?.code === "ECONNREFUSED") {
			return res.status(503).json({
				error: "Financial service is unavailable",
				detail:
					"The backend service is currently unreachable. Please try again later.",
			});
		}

		if (lastError?.code === "ETIMEDOUT") {
			return res.status(504).json({
				error: "Gateway timeout",
				detail: "The backend service did not respond in time.",
			});
		}

		return res.status(502).json({
			error: "Bad gateway",
			detail: "An error occurred while communicating with the backend service.",
		});
	};
};

export default createProxy;
