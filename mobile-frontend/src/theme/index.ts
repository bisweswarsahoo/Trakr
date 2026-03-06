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

	// Gradients explicitly defined as arrays for expo-linear-gradient
	gradients: {
		primary: ["#818cf8", "#4f46e5"], // light -> dark
		secondary: ["#f472b6", "#db2777"],
		success: ["#4ade80", "#16a34a"],
		error: ["#f87171", "#dc2626"],
	},
};

export const spacing = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	xxl: 40,
};

export const borderRadius = {
	sm: 4,
	md: 8,
	lg: 12,
	xl: 16,
	round: 9999,
};

export const typography = {
	h1: { fontSize: 32, fontWeight: "bold", lineHeight: 38 },
	h2: { fontSize: 24, fontWeight: "bold", lineHeight: 30 },
	h3: { fontSize: 20, fontWeight: "600", lineHeight: 26 },
	body: { fontSize: 16, fontWeight: "400", lineHeight: 24 },
	caption: { fontSize: 14, fontWeight: "500", lineHeight: 20 },
	small: { fontSize: 12, fontWeight: "500", lineHeight: 18 },
} as const;
