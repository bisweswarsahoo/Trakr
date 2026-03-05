import Expense from "../models/expenseModel.js";

export const getExpenses = async (req, res) => {
	try {
		const expenses = await Expense.find({ user: req.user._id }).sort({
			date: -1,
		});
		res.json(expenses);
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

export const addExpense = async (req, res) => {
	try {
		const { title, amount, category, date } = req.body;
		const expense = new Expense({
			title,
			amount,
			category,
			date,
			user: req.user._id,
		});
		await expense.save();
		res.status(201).json(expense);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export const updateExpense = async (req, res) => {
	try {
		const expense = await Expense.findOneAndUpdate(
			{ _id: req.params.id, user: req.user._id },
			req.body,
			{ new: true }
		);
		if (!expense) {
			return res.status(404).json({ error: "Expense not found" });
		}
		res.json(expense);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export const deleteExpense = async (req, res) => {
	try {
		const expense = await Expense.findOneAndDelete({
			_id: req.params.id,
			user: req.user._id,
		});
		if (!expense) {
			return res.status(404).json({ error: "Expense not found" });
		}
		res.json({ message: "Expense deleted" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
