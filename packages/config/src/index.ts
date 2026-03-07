export const APP_CONFIG = {
	APP_NAME: "Trakr",
	SUPPORTED_CURRENCIES: ["USD", "EUR", "GBP", "INR"],
	DEFAULT_CURRENCY: "USD",
	// Frontends should inject their respective env variables here during client init
	getApiUrl: (envUrl?: string) => envUrl || "http://localhost:8000/api/v1",
};

export const FEATURE_FLAGS = {
	ENABLE_DARK_MODE: false,
	ENABLE_PDF_EXPORT: false,
};

// ─── Default Categories ──────────────────────────────────────────────

export const DEFAULT_EXPENSE_CATEGORIES = [
	{ name: "Food", icon: "🍽️", key: "food" },
	{ name: "Transport", icon: "🚗", key: "transport" },
	{ name: "Entertainment", icon: "🎬", key: "entertainment" },
	{ name: "Shopping", icon: "🛍️", key: "shopping" },
	{ name: "Health", icon: "🏥", key: "healthcare" },
	{ name: "Utilities", icon: "💡", key: "utilities" },
	{ name: "Education", icon: "📚", key: "education" },
	{ name: "Other", icon: "💰", key: "other" },
] as const;

export const DEFAULT_INCOME_CATEGORIES = [
	{ name: "Salary", icon: "💼", key: "salary" },
	{ name: "Freelance", icon: "💻", key: "freelance" },
	{ name: "Investment", icon: "📈", key: "investment" },
	{ name: "Other", icon: "💰", key: "other" },
] as const;

// ─── Payment Methods ─────────────────────────────────────────────────

export const PAYMENT_METHODS = [
	"cash",
	"card",
	"upi",
	"bank_transfer",
	"other",
] as const;

export const DEFAULT_PAYMENT_METHOD = "cash";

// ─── Report Periods ──────────────────────────────────────────────────

export const REPORT_PERIODS = [
	{ value: "daily", label: "Daily" },
	{ value: "weekly", label: "Weekly" },
	{ value: "monthly", label: "Monthly" },
	{ value: "yearly", label: "Yearly" },
] as const;
