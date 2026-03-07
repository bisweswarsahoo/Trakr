import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = loginSchema.extend({
	name: z.string().min(2, "Name is required"),
	shop_name: z.string().min(2, "Shop name is required"),
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

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type TransactionInput = z.infer<typeof transactionSchema>;
