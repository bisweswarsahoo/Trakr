// Typography configuration for Trakr app
const fontFamily = [
	'"Inter"',
	'"Roboto"',
	'"Helvetica"',
	'"Arial"',
	"sans-serif",
].join(",");

export const typography = {
	fontFamily,

	// Font weights
	fontWeightLight: 300,
	fontWeightRegular: 400,
	fontWeightMedium: 500,
	fontWeightBold: 700,

	// Heading styles
	h1: {
		fontWeight: 700,
		fontSize: "2.5rem",
		lineHeight: 1.2,
		letterSpacing: "-0.01562em",
		"@media (max-width:600px)": {
			fontSize: "2rem",
		},
	},
	h2: {
		fontWeight: 700,
		fontSize: "2rem",
		lineHeight: 1.25,
		letterSpacing: "-0.00833em",
		"@media (max-width:600px)": {
			fontSize: "1.75rem",
		},
	},
	h3: {
		fontWeight: 600,
		fontSize: "1.75rem",
		lineHeight: 1.3,
		letterSpacing: "0em",
		"@media (max-width:600px)": {
			fontSize: "1.5rem",
		},
	},
	h4: {
		fontWeight: 600,
		fontSize: "1.5rem",
		lineHeight: 1.4,
		letterSpacing: "0.00735em",
		"@media (max-width:600px)": {
			fontSize: "1.25rem",
		},
	},
	h5: {
		fontWeight: 500,
		fontSize: "1.25rem",
		lineHeight: 1.5,
		letterSpacing: "0em",
	},
	h6: {
		fontWeight: 500,
		fontSize: "1.125rem",
		lineHeight: 1.6,
		letterSpacing: "0.0075em",
	},

	// Body text styles
	body1: {
		fontWeight: 400,
		fontSize: "1rem",
		lineHeight: 1.6,
		letterSpacing: "0.00938em",
	},
	body2: {
		fontWeight: 400,
		fontSize: "0.875rem",
		lineHeight: 1.57,
		letterSpacing: "0.00714em",
	},

	// Button text
	button: {
		fontWeight: 500,
		fontSize: "0.875rem",
		lineHeight: 1.43,
		letterSpacing: "0.02857em",
		textTransform: "none",
	},

	// Caption and overline
	caption: {
		fontWeight: 400,
		fontSize: "0.75rem",
		lineHeight: 1.66,
		letterSpacing: "0.03333em",
	},
	overline: {
		fontWeight: 400,
		fontSize: "0.75rem",
		lineHeight: 2.66,
		letterSpacing: "0.08333em",
		textTransform: "uppercase",
	},

	// Subtitle styles
	subtitle1: {
		fontWeight: 400,
		fontSize: "1rem",
		lineHeight: 1.75,
		letterSpacing: "0.00938em",
	},
	subtitle2: {
		fontWeight: 500,
		fontSize: "0.875rem",
		lineHeight: 1.57,
		letterSpacing: "0.00714em",
	},
};
