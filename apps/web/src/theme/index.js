import { createTheme } from "@mui/material/styles";
import { createColorScheme, baseColors } from "./colors";
import { typography } from "./typography";

const createShadows = (mode) => {
	const shadowColor = mode === "light" ? "0, 0, 0" : "0, 0, 0";
	const intensityMultiplier = mode === "light" ? 1 : 1.5;

	return [
		"none",
		`0 2px 8px rgba(${shadowColor}, ${0.08 * intensityMultiplier})`,
		`0 4px 12px rgba(${shadowColor}, ${0.1 * intensityMultiplier})`,
		`0 8px 24px rgba(${shadowColor}, ${0.12 * intensityMultiplier})`,
		`0 12px 32px rgba(${shadowColor}, ${0.14 * intensityMultiplier})`,
		`0 16px 40px rgba(${shadowColor}, ${0.16 * intensityMultiplier})`,
		`0 20px 48px rgba(${shadowColor}, ${0.18 * intensityMultiplier})`,
		`0 24px 56px rgba(${shadowColor}, ${0.2 * intensityMultiplier})`,
		`0 28px 64px rgba(${shadowColor}, ${0.22 * intensityMultiplier})`,
		`0 32px 72px rgba(${shadowColor}, ${0.24 * intensityMultiplier})`,
		`0 36px 80px rgba(${shadowColor}, ${0.26 * intensityMultiplier})`,
		`0 40px 88px rgba(${shadowColor}, ${0.28 * intensityMultiplier})`,
		`0 44px 96px rgba(${shadowColor}, ${0.3 * intensityMultiplier})`,
		`0 48px 104px rgba(${shadowColor}, ${0.32 * intensityMultiplier})`,
		`0 52px 112px rgba(${shadowColor}, ${0.34 * intensityMultiplier})`,
		`0 56px 120px rgba(${shadowColor}, ${0.36 * intensityMultiplier})`,
		`0 60px 128px rgba(${shadowColor}, ${0.38 * intensityMultiplier})`,
		`0 64px 136px rgba(${shadowColor}, ${0.4 * intensityMultiplier})`,
		`0 68px 144px rgba(${shadowColor}, ${0.42 * intensityMultiplier})`,
		`0 72px 152px rgba(${shadowColor}, ${0.44 * intensityMultiplier})`,
		`0 76px 160px rgba(${shadowColor}, ${0.46 * intensityMultiplier})`,
		`0 80px 168px rgba(${shadowColor}, ${0.48 * intensityMultiplier})`,
		`0 84px 176px rgba(${shadowColor}, ${0.5 * intensityMultiplier})`,
		`0 88px 184px rgba(${shadowColor}, ${0.52 * intensityMultiplier})`,
		`0 92px 192px rgba(${shadowColor}, ${0.54 * intensityMultiplier})`,
	];
};

const createThemeConfig = (mode) => {
	const colors = createColorScheme(mode);

	return createTheme({
		palette: {
			mode,
			primary: {
				main: baseColors.primary[500],
				light: baseColors.primary[400],
				dark: baseColors.primary[600],
				contrastText: colors.text.primary,
			},
			secondary: {
				main: baseColors.secondary[500],
				light: baseColors.secondary[400],
				dark: baseColors.secondary[600],
				contrastText: colors.text.primary,
			},
			error: {
				main: baseColors.error[500],
				light: baseColors.error[400],
				dark: baseColors.error[600],
			},
			warning: {
				main: baseColors.warning[500],
				light: baseColors.warning[400],
				dark: baseColors.warning[600],
			},
			info: {
				main: baseColors.primary[500],
				light: baseColors.primary[400],
				dark: baseColors.primary[600],
			},
			success: {
				main: baseColors.success[500],
				light: baseColors.success[400],
				dark: baseColors.success[600],
			},
			grey: baseColors.gray,
			background: {
				default: colors.background.default,
				paper: colors.background.paper,
			},
			text: {
				primary: colors.text.primary,
				secondary: colors.text.secondary,
				disabled: colors.text.disabled,
			},
			divider: colors.border.light,
		},
		typography,
		spacing: 8,
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 900,
				lg: 1200,
				xl: 1536,
			},
		},
		shape: {
			borderRadius: 12,
		},
		shadows: createShadows(mode),
		zIndex: {
			mobileStepper: 1000,
			fab: 1050,
			speedDial: 1050,
			appBar: 1100,
			drawer: 1200,
			modal: 1300,
			snackbar: 1400,
			tooltip: 1500,
		},
		transitions: {
			easing: {
				easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
				easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
				easeIn: "cubic-bezier(0.4, 0, 1, 1)",
				sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
			},
			duration: {
				shortest: 150,
				shorter: 200,
				short: 250,
				standard: 300,
				complex: 375,
				enteringScreen: 225,
				leavingScreen: 195,
			},
		},
	});
};

export const lightTheme = createThemeConfig("light");
export const darkTheme = createThemeConfig("dark");

export { createColorScheme, baseColors } from "./colors";
export { typography } from "./typography";
export * from "./utils";

export default lightTheme;
