export const formatCurrency = (amount: number, currency = "USD") => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(amount);
};

export const formatDate = (dateString: string | Date) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(date);
};

export const calculatePercentage = (value: number, total: number) => {
	if (total === 0) return 0;
	return Math.round((value / total) * 100);
};

export const getInitials = (name?: string) => {
	if (!name) return "?";
	return name.charAt(0).toUpperCase();
};
