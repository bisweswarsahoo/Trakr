import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApiClient } from "@trakr/api-client";
import { APP_CONFIG } from "@trakr/config";

const BASE_URL = APP_CONFIG.getApiUrl(
	process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:5000/api",
);

export const api = createApiClient({
	baseURL: BASE_URL,
	getToken: async () => await AsyncStorage.getItem("userToken"),
	onUnauthorized: async () => await AsyncStorage.removeItem("userToken"),
});
