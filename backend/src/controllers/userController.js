import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Register user
export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ error: "User already exists" });
		}

		const user = new User({ name, email, password });
		await user.save();

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Login user
export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(401).json({ error: "Invalid email or password" });
		}
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

// Get all users (protected)
export const getUsers = async (req, res) => {
	try {
		const users = await User.find().select("-password");
		res.json(users);
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};
