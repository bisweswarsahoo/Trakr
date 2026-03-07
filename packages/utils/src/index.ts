import type { Category } from "@trakr/types";

export const formatCurrency = (amount: number, currency = "USD") => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(amount);
};

export const formatDate = (dateString: string | Date) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(date);
};

export const calculatePercentage = (value: number, total: number) => {
	if (total === 0) return 0;
	return Math.round((value / total) * 100);
};

export const getInitials = (name?: string) => {
	if (!name) return "?";
	return name.charAt(0).toUpperCase();
};

/**
 * Extracts a user-friendly error message from an Axios error response.
 */
export const parseApiError = (
	error: any,
	fallback = "An error occurred",
): string => {
	if (error?.response?.data?.error) return error.response.data.error;
	if (error?.response?.data?.detail) return error.response.data.detail;
	if (error?.message) return error.message;
	return fallback;
};

/**
 * Builds a lookup map of category id → name from a list of categories.
 */
export const buildCategoryMap = (
	categories: Category[],
): Record<number, string> => {
	const map: Record<number, string> = {};
	for (const c of categories) {
		map[c.id] = c.name;
	}
	return map;
};

// ─── Dashboard Data Transformers ─────────────────────────────────────

/**
 * Transforms raw dashboard API data into an expense summary.
 */
export const transformExpenseSummary = (raw: any) => ({
	totalAmount: raw.monthly?.expense?.toFixed(2) || "0.00",
	totalExpenses:
		raw.recent_transactions?.filter((t: any) => t.type === "expense").length ||
		0,
	categoryCount: raw.charts?.category_breakdown?.length || 0,
	averageExpense:
		raw.monthly?.expense && raw.recent_transactions?.length
			? (
					raw.monthly.expense /
					Math.max(
						raw.recent_transactions.filter((t: any) => t.type === "expense")
							.length,
						1,
					)
				).toFixed(2)
			: "0.00",
});

/**
 * Transforms raw dashboard API data into an income summary.
 */
export const transformIncomeSummary = (raw: any) => {
	const incomeEntries =
		raw.recent_transactions?.filter((t: any) => t.type === "income") || [];
	return {
		totalAmount: raw.monthly?.income?.toFixed(2) || "0.00",
		totalEntries: incomeEntries.length,
	};
};

/**
 * Transforms raw dashboard API chart data into UI-ready format.
 */
export const transformDashboardCharts = (raw: any) => ({
	pieData: (raw.charts?.category_breakdown || []).map((c: any) => ({
		name: c.name || "Other",
		value: c.value || 0,
	})),
	barData: (raw.recent_transactions || [])
		.filter((t: any) => t.type === "expense")
		.slice(0, 7)
		.map((t: any) => ({
			name: t.title?.substring(0, 12) || "Expense",
			amount: t.amount || 0,
		})),
	monthlyData: (raw.charts?.monthly_trend || []).map((m: any) => ({
		month: m.month || "",
		amount: m.expense || 0,
	})),
});
