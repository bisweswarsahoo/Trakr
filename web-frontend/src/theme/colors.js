export const baseColors = {
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

const createGradients = (mode) => ({
	primary:
		mode === "light"
			? `linear-gradient(135deg, ${baseColors.primary[400]} 0%, ${baseColors.primary[600]} 100%)`
			: `linear-gradient(135deg, ${baseColors.primary[300]} 0%, ${baseColors.primary[500]} 100%)`,
	secondary:
		mode === "light"
			? `linear-gradient(135deg, ${baseColors.secondary[400]} 0%, ${baseColors.secondary[600]} 100%)`
			: `linear-gradient(135deg, ${baseColors.secondary[300]} 0%, ${baseColors.secondary[500]} 100%)`,
	success:
		mode === "light"
			? `linear-gradient(135deg, ${baseColors.success[400]} 0%, ${baseColors.success[600]} 100%)`
			: `linear-gradient(135deg, ${baseColors.success[300]} 0%, ${baseColors.success[500]} 100%)`,
	error:
		mode === "light"
			? `linear-gradient(135deg, ${baseColors.error[400]} 0%, ${baseColors.error[600]} 100%)`
			: `linear-gradient(135deg, ${baseColors.error[300]} 0%, ${baseColors.error[500]} 100%)`,
	warm:
		mode === "light"
			? "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
			: "linear-gradient(135deg, #ff8a80 0%, #ffd54f 100%)",
	cool:
		mode === "light"
			? "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
			: "linear-gradient(135deg, #80cbc4 0%, #f8bbd9 100%)",
});

export const createColorScheme = (mode) => ({
	...baseColors,
	gradients: createGradients(mode),
	background: {
		default: mode === "light" ? baseColors.gray[50] : baseColors.gray[950],
		paper: mode === "light" ? "#ffffff" : baseColors.gray[900],
		elevated: mode === "light" ? "#ffffff" : baseColors.gray[800],
		surface: mode === "light" ? baseColors.gray[100] : baseColors.gray[900],
		overlay: mode === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.7)",
		modal: mode === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.8)",
	},
	text: {
		primary: mode === "light" ? baseColors.gray[900] : baseColors.gray[50],
		secondary: mode === "light" ? baseColors.gray[600] : baseColors.gray[400],
		disabled: mode === "light" ? baseColors.gray[400] : baseColors.gray[600],
		hint: mode === "light" ? baseColors.gray[500] : baseColors.gray[500],
	},
	border: {
		light: mode === "light" ? baseColors.gray[200] : baseColors.gray[700],
		medium: mode === "light" ? baseColors.gray[300] : baseColors.gray[600],
		strong: mode === "light" ? baseColors.gray[400] : baseColors.gray[500],
	},
	semantic: {
		info: baseColors.primary,
		positive: baseColors.success,
		negative: baseColors.error,
		warning: baseColors.warning,
	},
});
