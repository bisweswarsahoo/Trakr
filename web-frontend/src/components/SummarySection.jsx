import { Grid } from "@mui/material";
import SummaryCard from "./SummaryCard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CategoryIcon from "@mui/icons-material/Category";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { useTheme, useMediaQuery } from "@mui/material";

const SummarySection = ({ summary }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const summaryData = [
		{
			icon: ReceiptIcon,
			title: "Total Amount",
			value: `₹${summary?.totalAmount || "0.00"}`,
			color: "primary",
			subtitle: "Total spent",
		},
		{
			icon: TrendingUpIcon,
			title: "Total Expenses",
			value: summary?.totalExpenses || 0,
			color: "success",
			subtitle: "Transactions",
		},
		{
			icon: CategoryIcon,
			title: "Categories",
			value: summary?.categoryCount || 0,
			color: "warning",
			subtitle: "Active categories",
		},
		{
			icon: TrackChangesIcon,
			title: "Average Expense",
			value: `₹${summary?.averageExpense || "0.00"}`,
			color: "info",
			subtitle: "Per transaction",
		},
	];

	return (
		<Grid
			container
			spacing={isMobile ? 2 : 3}
			sx={{ mb: 4 }}
		>
			{summaryData.map((item, index) => (
				<Grid
					key={index}
					size={{ xs: 12, sm: 6, md: 3 }}
				>
					<SummaryCard {...item} />
				</Grid>
			))}
		</Grid>
	);
};

export default SummarySection;
