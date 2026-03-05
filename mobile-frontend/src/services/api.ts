import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Replace string depending on device / emulator
// Android emulator uses 10.0.2.2 usually
const BASE_URL = "http://10.0.2.2:8000/api/v1";

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
