import Expense from "../models/expenseModel.js";

// Get all expenses for a user (later add auth)
export const getExpenses = async (req, res) => {
	try {
		const expenses = await Expense.find().populate("user", "name email");
		res.json(expenses);
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

export const addExpense = async (req, res) => {
	try {
		const { user, title, amount, category, date } = req.body;
		const expense = new Expense({ user, title, amount, category, date });
		await expense.save();
		res.status(201).json(expense);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export const updateExpense = async (req, res) => {
	try {
		const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(expense);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export const deleteExpense = async (req, res) => {
	try {
		await Expense.findByIdAndDelete(req.params.id);
		res.json({ message: "Expense deleted" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
