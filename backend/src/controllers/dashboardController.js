import Expense from "../models/expenseModel.js";

export const getDashboardData = async (req, res) => {
	try {
		const expenses = await Expense.find().sort({ date: -1 });

		const totalExpenses = expenses.length;
		const totalAmount = expenses.reduce(
			(sum, exp) => sum + parseFloat(exp.amount),
			0
		);
		const averageExpense = totalExpenses > 0 ? totalAmount / totalExpenses : 0;

		const categoryData = expenses.reduce((acc, exp) => {
			const category = exp.category;
			acc[category] = (acc[category] || 0) + parseFloat(exp.amount);
			return acc;
		}, {});

		const pieData = Object.keys(categoryData).map((key) => ({
			name: key,
			value: categoryData[key],
			count: expenses.filter((exp) => exp.category === key).length,
		}));

		const recentExpenses = expenses.slice(0, 10);
		const barData = recentExpenses.map((exp) => ({
			name:
				exp.title.length > 15 ? exp.title.substring(0, 15) + "..." : exp.title,
			amount: parseFloat(exp.amount),
			category: exp.category,
			date: exp.date,
		}));

		const categoryCount = Object.keys(categoryData).length;

		const monthlyData = [];
		const currentDate = new Date();
		for (let i = 5; i >= 0; i--) {
			const monthDate = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth() - i,
				1
			);
			const nextMonth = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth() - i + 1,
				1
			);

			const monthExpenses = expenses.filter((exp) => {
				const expDate = new Date(exp.date);
				return expDate >= monthDate && expDate < nextMonth;
			});

			const monthTotal = monthExpenses.reduce(
				(sum, exp) => sum + parseFloat(exp.amount),
				0
			);

			monthlyData.push({
				month: monthDate.toLocaleDateString("en-US", {
					month: "short",
					year: "numeric",
				}),
				amount: monthTotal,
				count: monthExpenses.length,
			});
		}

		const dashboardData = {
			summary: {
				totalExpenses,
				totalAmount: totalAmount.toFixed(2),
				averageExpense: averageExpense.toFixed(2),
				categoryCount,
			},
			charts: {
				pieData,
				barData,
				monthlyData,
			},
		};

		res.json(dashboardData);
	} catch (err) {
		console.error("Dashboard data error:", err);
		res.status(500).json({
			error: "Failed to fetch dashboard data",
			message: err.message,
		});
	}
};
