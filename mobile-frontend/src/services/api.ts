import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// All requests go through the Node.js API Gateway
// Android emulator: http://10.0.2.2:5000/api
// Physical device: http://<your-local-ip>:5000/api
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://10.0.2.2:5000/api";

export const api = axios.create({
	baseURL: BASE_URL,
	timeout: 15000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Automatically attach JWT token to every request
api.interceptors.request.use(async (config) => {
	const token = await AsyncStorage.getItem("userToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Handle 401 responses globally (token expired/invalid)
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			await AsyncStorage.removeItem("userToken");
		}
		return Promise.reject(error);
	},
);
