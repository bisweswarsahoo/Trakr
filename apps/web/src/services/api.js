import { createApiClient } from "@trakr/api-client";
import { APP_CONFIG } from "@trakr/config";

const BASE_URL = APP_CONFIG.getApiUrl(
	import.meta.env.VITE_API_URL || "http://localhost:5000/api",
);

const API = createApiClient({
	baseURL: BASE_URL,
	getToken: () => localStorage.getItem("token"),
	onUnauthorized: () => localStorage.removeItem("token"),
});

export default API;
