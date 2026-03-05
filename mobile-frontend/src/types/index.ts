export interface User {
	id: number;
	email: string;
	name: string;
	shop_name: string;
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
}
