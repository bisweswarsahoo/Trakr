import axios, { AxiosInstance } from "axios";

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
