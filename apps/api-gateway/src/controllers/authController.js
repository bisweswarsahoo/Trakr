import { loginSchema, registerSchema } from "@trakr/validation";
import bcrypt from "bcryptjs";
import { query } from "../config/db.js";
import generateToken from "../utils/generateToken.js";

/**
 * POST /auth/register
 * Register a new user
 */
export const registerUser = async (req, res) => {
	try {
		const parsed = registerSchema.safeParse(req.body);
		if (!parsed.success) {
			console.log(
				"[Register Validation Failed]",
				req.body,
				parsed.error.issues,
			);
			return res.status(400).json({ error: parsed.error.issues[0].message });
		}
		const { name, email, password } = parsed.data;

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
			`INSERT INTO users (name, email, hashed_password, created_at)
			 VALUES ($1, $2, $3, NOW())
			 RETURNING id, name, email, created_at`,
			[name, email.toLowerCase(), hashedPassword],
		);

		const user = result.rows[0];

		res.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
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
		const parsed = loginSchema.safeParse(req.body);
		if (!parsed.success) {
			return res.status(400).json({ error: parsed.error.issues[0].message });
		}
		const { email, password } = parsed.data;

		const result = await query(
			"SELECT id, name, email, hashed_password FROM users WHERE email = $1",
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
