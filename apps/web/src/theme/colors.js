import {
	colorScale,
	createColorScheme as dsCreateColorScheme,
	createGradients,
} from "@trakr/design-system";

// Re-export the shared color scale as baseColors for MUI theme compatibility
export const baseColors = colorScale;

export const createColorScheme = dsCreateColorScheme;

export { createGradients };
