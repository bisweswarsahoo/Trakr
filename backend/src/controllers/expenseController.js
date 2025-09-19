import Expense from "../models/expenseModel.js";

export const getExpenses = async (req, res) => {
	try {
		const expenses = await Expense.find();
		res.json(expenses);
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

export const addExpense = async (req, res) => {
	try {
		const { title, amount, category, date } = req.body;
		const expense = new Expense({ title, amount, category, date });
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
