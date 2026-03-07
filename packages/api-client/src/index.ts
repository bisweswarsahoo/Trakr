import axios, { AxiosInstance } from "axios";
import type {
	Transaction,
	Category,
	DashboardData,
	SummaryReport,
	CategoryReport,
	User,
	AuthResponse,
} from "@trakr/types";

// ─── Base Client Factory ─────────────────────────────────────────────

export interface ApiClientConfig {
	baseURL: string;
	getToken: () => Promise<string | null> | string | null;
	onUnauthorized?: () => void | Promise<void>;
	timeout?: number;
}

export const createApiClient = ({
	baseURL,
	getToken,
	onUnauthorized,
	timeout = 15000,
}: ApiClientConfig): AxiosInstance => {
	const api = axios.create({
		baseURL,
		timeout,
		headers: { "Content-Type": "application/json" },
	});

	api.interceptors.request.use(async (config) => {
		const token = await Promise.resolve(getToken());
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});

	api.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (error.response?.status === 401 && onUnauthorized) {
				await Promise.resolve(onUnauthorized());
			}
			return Promise.reject(error);
		},
	);

	return api;
};

// ─── Typed API Endpoint Factories ────────────────────────────────────

export const createAuthApi = (client: AxiosInstance) => ({
	login: (email: string, password: string) =>
		client.post<AuthResponse>("/auth/login", { email, password }),
	register: (data: { name: string; email: string; password: string }) =>
		client.post("/auth/register", data),
	logout: () => client.post("/auth/logout"),
});

export const createExpenseApi = (client: AxiosInstance) => ({
	getAll: () => client.get<Transaction[]>("/expenses"),
	create: (data: Partial<Transaction>) =>
		client.post<Transaction>("/expenses/", data),
	delete: (id: number) => client.delete(`/expenses/${id}`),
});

export const createIncomeApi = (client: AxiosInstance) => ({
	getAll: () => client.get<Transaction[]>("/income"),
	create: (data: Partial<Transaction>) =>
		client.post<Transaction>("/income/", data),
	delete: (id: number) => client.delete(`/income/${id}`),
});

export const createDashboardApi = (client: AxiosInstance) => ({
	get: () => client.get<DashboardData>("/dashboard"),
});

export const createReportApi = (client: AxiosInstance) => ({
	getByPeriod: (period: string) =>
		client.get<SummaryReport>(`/reports/${period}`),
	getByCategory: () => client.get<CategoryReport[]>("/reports/category"),
	getSummary: () => client.get<SummaryReport>("/reports/summary"),
});

export const createCategoryApi = (client: AxiosInstance) => ({
	getAll: () => client.get<Category[]>("/categories"),
});

export const createUserApi = (client: AxiosInstance) => ({
	getMe: () => client.get<User>("/users/me"),
	updateMe: (data: { name?: string }) => client.put<User>("/users/me", data),
});
