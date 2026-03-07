import { query } from "../config/db.js";

/**
 * GET /shops
 * Get all shops for the authenticated user
 */
export const getShops = async (req, res) => {
	try {
		const result = await query(
			"SELECT * FROM shops WHERE user_id = $1 ORDER BY created_at DESC",
			[req.user.id],
		);
		res.json(result.rows);
	} catch (err) {
		console.error("Get shops error:", err);
		res.status(500).json({ error: "Server error" });
	}
};

/**
 * POST /shops
 * Create a new shop
 */
export const createShop = async (req, res) => {
	try {
		const { name, address, phone } = req.body;

		if (!name) {
			return res.status(400).json({ error: "Shop name is required" });
		}

		const result = await query(
			`INSERT INTO shops (user_id, name, address, phone, created_at)
			 VALUES ($1, $2, $3, $4, NOW())
			 RETURNING *`,
			[req.user.id, name, address || null, phone || null],
		);

		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error("Create shop error:", err);
		res.status(500).json({ error: "Server error" });
	}
};

/**
 * PUT /shops/:id
 * Update a shop
 */
export const updateShop = async (req, res) => {
	try {
		const { name, address, phone } = req.body;
		const { id } = req.params;

		const result = await query(
			`UPDATE shops SET name = COALESCE($1, name), address = COALESCE($2, address),
			 phone = COALESCE($3, phone), updated_at = NOW()
			 WHERE id = $4 AND user_id = $5
			 RETURNING *`,
			[name, address, phone, id, req.user.id],
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Shop not found" });
		}

		res.json(result.rows[0]);
	} catch (err) {
		console.error("Update shop error:", err);
		res.status(500).json({ error: "Server error" });
	}
};
