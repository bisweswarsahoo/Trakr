import { colorScale } from "./colors";

type ColorMode = "light" | "dark";

/**
 * Creates CSS linear-gradient strings for a given mode.
 * Used by web (CSS gradients) — mobile uses the array-based gradients in `colors.gradients`.
 */
export const createGradients = (mode: ColorMode) => ({
	primary:
		mode === "light"
			? `linear-gradient(135deg, ${colorScale.primary[400]} 0%, ${colorScale.primary[600]} 100%)`
			: `linear-gradient(135deg, ${colorScale.primary[300]} 0%, ${colorScale.primary[500]} 100%)`,
	secondary:
		mode === "light"
			? `linear-gradient(135deg, ${colorScale.secondary[400]} 0%, ${colorScale.secondary[600]} 100%)`
			: `linear-gradient(135deg, ${colorScale.secondary[300]} 0%, ${colorScale.secondary[500]} 100%)`,
	success:
		mode === "light"
			? `linear-gradient(135deg, ${colorScale.success[400]} 0%, ${colorScale.success[600]} 100%)`
			: `linear-gradient(135deg, ${colorScale.success[300]} 0%, ${colorScale.success[500]} 100%)`,
	error:
		mode === "light"
			? `linear-gradient(135deg, ${colorScale.error[400]} 0%, ${colorScale.error[600]} 100%)`
			: `linear-gradient(135deg, ${colorScale.error[300]} 0%, ${colorScale.error[500]} 100%)`,
	warm:
		mode === "light"
			? "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
			: "linear-gradient(135deg, #ff8a80 0%, #ffd54f 100%)",
	cool:
		mode === "light"
			? "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
			: "linear-gradient(135deg, #80cbc4 0%, #f8bbd9 100%)",
});

/**
 * Creates a mode-aware color scheme from the shared color scale.
 * Used by the web MUI theme to build palette values.
 */
export const createColorScheme = (mode: ColorMode) => ({
	gradients: createGradients(mode),
	background: {
		default: mode === "light" ? colorScale.gray[50] : colorScale.gray[950],
		paper: mode === "light" ? "#ffffff" : colorScale.gray[900],
		elevated: mode === "light" ? "#ffffff" : colorScale.gray[800],
		surface: mode === "light" ? colorScale.gray[100] : colorScale.gray[900],
		overlay: mode === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.7)",
		modal: mode === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.8)",
	},
	text: {
		primary: mode === "light" ? colorScale.gray[900] : colorScale.gray[50],
		secondary: mode === "light" ? colorScale.gray[600] : colorScale.gray[400],
		disabled: mode === "light" ? colorScale.gray[400] : colorScale.gray[600],
		hint: colorScale.gray[500],
	},
	border: {
		light: mode === "light" ? colorScale.gray[200] : colorScale.gray[700],
		medium: mode === "light" ? colorScale.gray[300] : colorScale.gray[600],
		strong: mode === "light" ? colorScale.gray[400] : colorScale.gray[500],
	},
	semantic: {
		info: colorScale.primary,
		positive: colorScale.success,
		negative: colorScale.error,
		warning: colorScale.warning,
	},
});

/**
 * Returns a CSS gradient string by name for the given mode.
 */
export const getGradientByName = (
	gradientName: string,
	mode: ColorMode = "light",
) => {
	const gradients = createGradients(mode);
	return (gradients as any)[gradientName] || gradients.primary;
};
