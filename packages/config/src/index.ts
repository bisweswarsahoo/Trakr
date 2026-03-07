export const APP_CONFIG = {
	APP_NAME: "Trakr",
	SUPPORTED_CURRENCIES: ["USD", "EUR", "GBP", "INR"],
	DEFAULT_CURRENCY: "USD",
	// Frontends should inject their respective env variables here during client init
	getApiUrl: (envUrl?: string) => envUrl || "http://localhost:8000/api/v1",
};

export const FEATURE_FLAGS = {
	ENABLE_DARK_MODE: false,
	ENABLE_PDF_EXPORT: false,
};
