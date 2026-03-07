import jwt from "jsonwebtoken";
import { query } from "../config/db.js";

/**
 * Authentication middleware.
 * Verifies JWT token and attaches user object to request.
 */
const protect = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			const result = await query(
				"SELECT id, name, email FROM users WHERE id = $1",
				[decoded.id],
			);

			if (result.rows.length === 0) {
				return res
					.status(401)
					.json({ error: "Not authorized, user not found" });
			}

			req.user = result.rows[0];
			next();
		} catch (err) {
			console.error("Auth middleware error:", err.message);
			return res.status(401).json({ error: "Not authorized, token failed" });
		}
	} else {
		return res.status(401).json({ error: "Not authorized, no token provided" });
	}
};

export default protect;
