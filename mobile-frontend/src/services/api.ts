import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Set EXPO_PUBLIC_API_URL in your .env file
// Android emulator: http://10.0.2.2:8000/api/v1
// Physical device: http://<your-local-ip>:8000/api/v1
const BASE_URL =
	process.env.EXPO_PUBLIC_API_URL ?? "http://10.0.2.2:8000/api/v1";

export const api = axios.create({
	baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
	const token = await AsyncStorage.getItem("userToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
