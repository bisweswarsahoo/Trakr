import React, { createContext, useContext, useState, useCallback } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./index";

const ThemeContext = createContext({
	isDark: false,
	toggleTheme: () => {},
	currentTheme: lightTheme,
});

export const useThemeContext = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error(
			"useThemeContext must be used within a ThemeContextProvider"
		);
	}
	return context;
};

export const ThemeContextProvider = ({ children }) => {
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

	const contextValue = {
		isDark,
		toggleTheme,
		currentTheme,
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

export default ThemeContextProvider;
