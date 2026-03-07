import { query } from "../config/db.js";

/**
 * GET /users/me
 * Get current authenticated user's profile
 */
export const getMe = async (req, res) => {
	try {
		const result = await query(
			"SELECT id, name, email, created_at FROM users WHERE id = $1",
			[req.user.id],
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(result.rows[0]);
	} catch (err) {
		console.error("Get user error:", err);
		res.status(500).json({ error: "Server error" });
	}
};

/**
 * PUT /users/me
 * Update current authenticated user's profile
 */
export const updateMe = async (req, res) => {
	try {
		const { name } = req.body;
		const fields = [];
		const values = [];
		let paramCount = 0;

		if (name !== undefined) {
			paramCount++;
			fields.push(`name = $${paramCount}`);
			values.push(name);
		}

		if (fields.length === 0) {
			return res.status(400).json({ error: "No fields to update" });
		}

		paramCount++;
		values.push(req.user.id);

		const result = await query(
			`UPDATE users SET ${fields.join(", ")}, updated_at = NOW()
			 WHERE id = $${paramCount}
			 RETURNING id, name, email, created_at, updated_at`,
			values,
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(result.rows[0]);
	} catch (err) {
		console.error("Update user error:", err);
		res.status(500).json({ error: "Server error" });
	}
};
