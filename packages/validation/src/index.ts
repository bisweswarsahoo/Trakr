import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = loginSchema.extend({
	name: z.string().min(2, "Name is required"),
});

export const transactionSchema = z.object({
	amount: z.number().positive("Amount must be positive"),
	title: z.string().min(1, "Title is required"),
	type: z.enum(["income", "expense"]),
	category_id: z.number().optional(),
	date: z.string(),
	payment_method: z.string().default("cash"),
	notes: z.string().optional(),
	vendor: z.string().optional(),
});

/** Client-side expense form validation (title, amount, category, date required) */
export const expenseFormSchema = z.object({
	title: z.string().min(1, "Title is required"),
	amount: z
		.string()
		.min(1, "Enter a valid amount")
		.refine(
			(val) => !isNaN(Number(val)) && Number(val) > 0,
			"Amount must be a positive number",
		),
	category: z.string().min(1, "Category is required"),
	date: z.string().min(1, "Select a date"),
});

/** Client-side income form validation (title, amount, date required) */
export const incomeFormSchema = z.object({
	title: z.string().min(1, "Title is required"),
	amount: z
		.string()
		.min(1, "Enter a valid amount")
		.refine(
			(val) => !isNaN(Number(val)) && Number(val) > 0,
			"Amount must be a positive number",
		),
	date: z.string().min(1, "Select a date"),
	payment_method: z.string().default("cash"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type TransactionInput = z.infer<typeof transactionSchema>;
export type ExpenseFormInput = z.infer<typeof expenseFormSchema>;
export type IncomeFormInput = z.infer<typeof incomeFormSchema>;
