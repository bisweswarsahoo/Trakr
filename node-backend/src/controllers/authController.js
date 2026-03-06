import bcrypt from "bcryptjs";
import { query } from "../config/db.js";
import generateToken from "../utils/generateToken.js";

/**
 * POST /auth/register
 * Register a new user
 */
export const registerUser = async (req, res) => {
	try {
		const { name, email, password, shop_name } = req.body;

		if (!name || !email || !password || !shop_name) {
			return res
				.status(400)
				.json({
					error: "All fields are required: name, email, password, shop_name",
				});
		}

		// Check if user already exists
		const existing = await query("SELECT id FROM users WHERE email = $1", [
			email.toLowerCase(),
		]);
		if (existing.rows.length > 0) {
			return res
				.status(400)
				.json({ error: "User already exists with this email" });
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Insert user
		const result = await query(
			`INSERT INTO users (name, email, hashed_password, shop_name, created_at)
			 VALUES ($1, $2, $3, $4, NOW())
			 RETURNING id, name, email, shop_name, created_at`,
			[name, email.toLowerCase(), hashedPassword, shop_name],
		);

		const user = result.rows[0];

		res.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
			shop_name: user.shop_name,
			token: generateToken(user.id),
		});
	} catch (err) {
		console.error("Register error:", err);
		res.status(500).json({ error: "Server error during registration" });
	}
};

/**
 * POST /auth/login
 * Login user and return JWT
 */
export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		const result = await query(
			"SELECT id, name, email, hashed_password, shop_name FROM users WHERE email = $1",
			[email.toLowerCase()],
		);

		if (result.rows.length === 0) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		const user = result.rows[0];
		const isMatch = await bcrypt.compare(password, user.hashed_password);

		if (!isMatch) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		res.json({
			id: user.id,
			name: user.name,
			email: user.email,
			shop_name: user.shop_name,
			token: generateToken(user.id),
		});
	} catch (err) {
		console.error("Login error:", err);
		res.status(500).json({ error: "Server error during login" });
	}
};

/**
 * POST /auth/logout
 * Logout (client-side token removal; server-side is a no-op for stateless JWT)
 */
export const logoutUser = async (req, res) => {
	res.json({ message: "Logged out successfully" });
};
