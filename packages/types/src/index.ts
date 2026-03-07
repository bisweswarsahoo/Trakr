export interface User {
	id: number;
	email: string;
	name: string;
	created_at?: string;
}

export interface Category {
	id: number;
	name: string;
	icon: string;
	color: string;
	type: "income" | "expense";
	is_default: boolean;
}

export interface Transaction {
	id: number;
	type: "income" | "expense";
	amount: number;
	title: string;
	date: string;
	payment_method: string;
	category_id?: number;
	notes?: string;
	vendor?: string;
	receipt_url?: string;
}

export interface SummaryReport {
	total_income: number;
	total_expense: number;
	net_profit: number;
	transaction_count?: number;
}

export interface AuthResponse {
	token: string;
	id: number;
	email: string;
	name: string;
}

export interface DashboardData {
	monthly: {
		income: number;
		expense: number;
		net: number;
	};
	charts: {
		category_breakdown: Array<{ name: string; value: number; color?: string }>;
		monthly_trend: Array<{ month: string; expense: number; income?: number }>;
	};
	recent_transactions: Transaction[];
}

export interface CategoryReport {
	category_name: string;
	total: number;
	count: number;
	color?: string;
	icon?: string;
}

export interface Notification {
	id: number;
	user_id: number;
	title: string;
	message: string;
	read: boolean;
	created_at: string;
}
