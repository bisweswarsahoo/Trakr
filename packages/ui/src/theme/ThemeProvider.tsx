import React, { createContext, useContext, useState, useCallback } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./muiTheme";
import { createColorScheme } from "@trakr/design-system";

export const ThemeContext = createContext<any>({
	isDark: false,
	toggleTheme: () => {},
	currentTheme: lightTheme,
	colors: createColorScheme("light"),
});

export const useThemeContext = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error(
			"useThemeContext must be used within a ThemeContextProvider",
		);
	}
	return context;
};

export const ThemeProvider = ({ children }: any) => {
	const [isDark, setIsDark] = useState(() => {
		const savedTheme = localStorage.getItem("trakr-theme");
		if (savedTheme) {
			return savedTheme === "dark";
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	const toggleTheme = useCallback(() => {
		setIsDark((prev) => {
			const newTheme = !prev;
			localStorage.setItem("trakr-theme", newTheme ? "dark" : "light");
			return newTheme;
		});
	}, []);

	const currentTheme = isDark ? darkTheme : lightTheme;

	const colors = createColorScheme(isDark ? "dark" : "light");

	const contextValue = {
		isDark,
		toggleTheme,
		currentTheme,
		colors,
	};

	return (
		<ThemeContext.Provider value={contextValue}>
			<MUIThemeProvider theme={currentTheme}>
				<CssBaseline />
				{children}
			</MUIThemeProvider>
		</ThemeContext.Provider>
	);
};
