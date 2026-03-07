import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";
import { Appearance } from "react-native";
import { createColorScheme } from "@trakr/design-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext<any>({
	isDark: false,
	toggleTheme: () => {},
	colors: createColorScheme("light"),
});

export const useThemeContext = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useThemeContext must be used within a ThemeProvider");
	}
	return context;
};

export const ThemeProvider = ({ children }: any) => {
	const [isDark, setIsDark] = useState(() => {
		return Appearance.getColorScheme() === "dark";
	});

	useEffect(() => {
		const loadTheme = async () => {
			try {
				const saved = await AsyncStorage.getItem("trakr-theme");
				if (saved) {
					setIsDark(saved === "dark");
				}
			} catch (e) {
				// ignore
			}
		};
		loadTheme();
	}, []);

	const toggleTheme = useCallback(() => {
		setIsDark((prev: boolean) => {
			const newValue = !prev;
			AsyncStorage.setItem("trakr-theme", newValue ? "dark" : "light").catch(
				() => {},
			);
			return newValue;
		});
	}, []);

	const colors = createColorScheme(isDark ? "dark" : "light");

	const contextValue = {
		isDark,
		toggleTheme,
		colors,
	};

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
};
