import { alpha } from "@mui/material/styles";

export const createAlphaColor = (color, opacity) => alpha(color, opacity);

export const getCategoryColor = (category, theme) => {
	const categoryColorMap = {
		food: theme.palette.warning.main,
		transport: theme.palette.info.main,
		entertainment: theme.palette.secondary.main,
		shopping: theme.palette.success.main,
		healthcare: theme.palette.error.main,
		utilities: theme.palette.info.main,
		education: theme.palette.primary.main,
		other: theme.palette.grey[500],
	};

	return categoryColorMap[category?.toLowerCase()] || theme.palette.grey[500];
};

export const getGradientByName = (gradientName, theme) => {
	const gradients = {
		primary:
			theme.palette.mode === "light"
				? `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`
				: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
		secondary:
			theme.palette.mode === "light"
				? `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.dark} 100%)`
				: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
		success:
			theme.palette.mode === "light"
				? `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.dark} 100%)`
				: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.light} 100%)`,
		error:
			theme.palette.mode === "light"
				? `linear-gradient(135deg, ${theme.palette.error.light} 0%, ${theme.palette.error.dark} 100%)`
				: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.light} 100%)`,
		warm:
			theme.palette.mode === "light"
				? "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
				: "linear-gradient(135deg, #ff8a80 0%, #ffd54f 100%)",
		cool:
			theme.palette.mode === "light"
				? "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
				: "linear-gradient(135deg, #80cbc4 0%, #f8bbd9 100%)",
	};

	return gradients[gradientName] || gradients.primary;
};

// Z-index values for consistent layering
export const zIndex = {
	drawer: 1200,
	appBar: 1100,
	modal: 1300,
	snackbar: 1400,
	tooltip: 1500,
};
