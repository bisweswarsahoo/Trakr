import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "./src/store";
import { api } from "./src/services/api";

export default function App() {
	const { signIn } = useAuthStore();

	useEffect(() => {
		// Check if user is logged in
		const checkLoginState = async () => {
			try {
				const token = await AsyncStorage.getItem("userToken");
				if (token) {
					// Attempt to fetch user profile via Node.js gateway
					api.defaults.headers.Authorization = `Bearer ${token}`;
					const res = await api.get("/users/me");
					signIn(res.data, token);
				}
			} catch (e) {
				console.error("Failed to restore session", e);
			}
		};
		checkLoginState();
	}, []);

	return (
		<SafeAreaProvider>
			<AppNavigator />
		</SafeAreaProvider>
	);
}
