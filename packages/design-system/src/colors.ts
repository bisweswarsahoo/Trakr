export const colors = {
	// Base Colors mapped from Web theme
	primary: "#6366f1", // Indigo 500
	primaryLight: "#818cf8", // Indigo 400
	primaryDark: "#4f46e5", // Indigo 600
	secondary: "#ec4899", // Pink 500
	secondaryLight: "#f472b6", // Pink 400
	secondaryDark: "#db2777", // Pink 600
	success: "#22c55e", // Emerald 500
	successLight: "#4ade80", // Emerald 400
	warning: "#f59e0b", // Amber 500
	error: "#ef4444", // Red 500

	// Greys/Slates mapped from Web theme
	background: "#f8fafc", // Slate 50
	surface: "#ffffff",
	border: "#e2e8f0", // Slate 200
	borderStrong: "#cbd5e1", // Slate 300
	text: "#0f172a", // Slate 900
	textSecondary: "#64748b", // Slate 500
	textDisabled: "#94a3b8", // Slate 400

	// Gradients explicitly defined as arrays for expo-linear-gradient and css
	gradients: {
		primary: ["#818cf8", "#4f46e5"], // light -> dark
		secondary: ["#f472b6", "#db2777"],
		success: ["#4ade80", "#16a34a"],
		error: ["#f87171", "#dc2626"],
	},
};

/**
 * Full color scales (50–950) for building platform theme systems (e.g. MUI).
 * Sourced from Tailwind-compatible palettes.
 */
export const colorScale = {
	primary: {
		50: "#f0f4ff",
		100: "#e0e7ff",
		200: "#c7d2fe",
		300: "#a5b4fc",
		400: "#818cf8",
		500: "#6366f1",
		600: "#4f46e5",
		700: "#4338ca",
		800: "#3730a3",
		900: "#312e81",
		950: "#1e1b4b",
	},
	secondary: {
		50: "#fdf2f8",
		100: "#fce7f3",
		200: "#fbcfe8",
		300: "#f9a8d4",
		400: "#f472b6",
		500: "#ec4899",
		600: "#db2777",
		700: "#be185d",
		800: "#9d174d",
		900: "#831843",
		950: "#500724",
	},
	success: {
		50: "#f0fdf4",
		100: "#dcfce7",
		200: "#bbf7d0",
		300: "#86efac",
		400: "#4ade80",
		500: "#22c55e",
		600: "#16a34a",
		700: "#15803d",
		800: "#166534",
		900: "#14532d",
		950: "#052e16",
	},
	warning: {
		50: "#fffbeb",
		100: "#fef3c7",
		200: "#fde68a",
		300: "#fcd34d",
		400: "#fbbf24",
		500: "#f59e0b",
		600: "#d97706",
		700: "#b45309",
		800: "#92400e",
		900: "#78350f",
		950: "#451a03",
	},
	error: {
		50: "#fef2f2",
		100: "#fee2e2",
		200: "#fecaca",
		300: "#fca5a5",
		400: "#f87171",
		500: "#ef4444",
		600: "#dc2626",
		700: "#b91c1c",
		800: "#991b1b",
		900: "#7f1d1d",
		950: "#450a0a",
	},
	gray: {
		50: "#f8fafc",
		100: "#f1f5f9",
		200: "#e2e8f0",
		300: "#cbd5e1",
		400: "#94a3b8",
		500: "#64748b",
		600: "#475569",
		700: "#334155",
		800: "#1e293b",
		900: "#0f172a",
		950: "#020617",
	},
};

/**
 * Converts a hex color string to an rgba string with the specified opacity.
 * Used extensively in the web app for glassy UI effects.
 */
export const createAlphaColor = (hex: string, alpha: number): string => {
	// If it's already an rgba or rgb string, return as is (simple fallback)
	if (hex.startsWith("rgb")) return hex;

	// Remove hash if present
	hex = hex.replace("#", "");

	// Handle 3-char hex
	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}

	const r = parseInt(hex.substring(0, 2), 16) || 0;
	const g = parseInt(hex.substring(2, 4), 16) || 0;
	const b = parseInt(hex.substring(4, 6), 16) || 0;

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Returns a color based on the category name.
 */
export const getCategoryColor = (category: string, theme: any): string => {
	const lowerCat = category?.toLowerCase() || "";
	if (lowerCat.includes("food"))
		return theme.palette.error.main || colors.error;
	if (lowerCat.includes("transport"))
		return theme.palette.warning.main || colors.warning;
	if (lowerCat.includes("salary") || lowerCat.includes("income"))
		return theme.palette.success.main || colors.success;
	if (lowerCat.includes("entertainment"))
		return theme.palette.secondary.main || colors.secondaryDark;
	if (lowerCat.includes("shopping"))
		return theme.palette.info?.main || colors.primary;
	return theme.palette.primary.main || colors.primary;
};
