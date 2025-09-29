import { alpha } from "@mui/material/styles";
import { colors } from "./colors";

// Common component styles and overrides
export const componentStyles = {
	// Button component overrides
	MuiButton: {
		styleOverrides: {
			root: {
				borderRadius: 12,
				textTransform: "none",
				fontWeight: 500,
				boxShadow: "none",
				transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
				"&:hover": {
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
					transform: "translateY(-1px)",
				},
				"&:active": {
					transform: "translateY(0)",
				},
			},
			contained: {
				background: colors.gradients.primary,
				color: colors.text.light,
				"&:hover": {
					background: colors.gradients.primary,
					opacity: 0.9,
				},
				"&:disabled": {
					background: colors.gray[300],
					color: colors.gray[500],
				},
			},
			outlined: {
				borderColor: colors.primary[500],
				color: colors.primary[500],
				"&:hover": {
					borderColor: colors.primary[600],
					backgroundColor: alpha(colors.primary[500], 0.04),
				},
			},
			text: {
				color: colors.primary[500],
				"&:hover": {
					backgroundColor: alpha(colors.primary[500], 0.04),
				},
			},
		},
	},

	// TextField component overrides
	MuiTextField: {
		styleOverrides: {
			root: {
				"& .MuiOutlinedInput-root": {
					borderRadius: 12,
					transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					"&:hover": {
						"& .MuiOutlinedInput-notchedOutline": {
							borderColor: colors.primary[400],
						},
					},
					"&.Mui-focused": {
						"& .MuiOutlinedInput-notchedOutline": {
							borderColor: colors.primary[500],
							borderWidth: 2,
						},
					},
				},
				"& .MuiInputLabel-root": {
					color: colors.gray[600],
					"&.Mui-focused": {
						color: colors.primary[500],
					},
				},
			},
		},
	},

	// Paper component overrides
	MuiPaper: {
		styleOverrides: {
			root: {
				borderRadius: 16,
				boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
			},
			elevation1: {
				boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
			},
			elevation2: {
				boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
			},
			elevation3: {
				boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
			},
		},
	},

	// Card component overrides
	MuiCard: {
		styleOverrides: {
			root: {
				borderRadius: 16,
				boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
				transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
				"&:hover": {
					boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
					transform: "translateY(-2px)",
				},
			},
		},
	},

	// AppBar component overrides
	MuiAppBar: {
		styleOverrides: {
			root: {
				boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
				backgroundColor: colors.background.paper,
				color: colors.text.primary,
			},
		},
	},

	// Drawer component overrides
	MuiDrawer: {
		styleOverrides: {
			paper: {
				borderRadius: "0 16px 16px 0",
				border: "none",
				boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
			},
		},
	},

	// List item overrides
	MuiListItemButton: {
		styleOverrides: {
			root: {
				borderRadius: 12,
				margin: "4px 8px",
				transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
				"&:hover": {
					backgroundColor: alpha(colors.primary[500], 0.08),
					transform: "translateX(4px)",
				},
				"&.Mui-selected": {
					backgroundColor: alpha(colors.primary[500], 0.12),
					"&:hover": {
						backgroundColor: alpha(colors.primary[500], 0.16),
					},
				},
			},
		},
	},

	// Avatar component overrides
	MuiAvatar: {
		styleOverrides: {
			root: {
				fontWeight: 600,
			},
		},
	},

	// Chip component overrides
	MuiChip: {
		styleOverrides: {
			root: {
				borderRadius: 8,
				fontWeight: 500,
			},
			filled: {
				backgroundColor: alpha(colors.primary[500], 0.1),
				color: colors.primary[700],
			},
		},
	},
};
