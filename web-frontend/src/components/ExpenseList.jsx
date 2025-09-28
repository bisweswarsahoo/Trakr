import {
	Typography,
	Paper,
	IconButton,
	Box,
	CircularProgress,
	useTheme,
	useMediaQuery,
	Card,
	CardContent,
	Avatar,
	Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CategoryIcon from "@mui/icons-material/Category";

const ExpenseList = ({
	expenses,
	summary,
	loading,
	summaryLoading,
	onDeleteExpense,
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));

	const getCategoryColor = (category) => {
		const colors = {
			food: "#FF6B6B",
			transport: "#4ECDC4",
			entertainment: "#45B7D1",
			shopping: "#96CEB4",
			health: "#FFEAA7",
			utilities: "#DDA0DD",
			education: "#98D8C8",
			default: "#95A5A6",
		};
		return colors[category.toLowerCase()] || colors.default;
	};

	const getCategoryIcon = (category) => {
		const icons = {
			food: "🍽️",
			transport: "🚗",
			entertainment: "🎬",
			shopping: "🛍️",
			health: "🏥",
			utilities: "💡",
			education: "📚",
			default: "💰",
		};
		return icons[category.toLowerCase()] || icons.default;
	};

	return (
		<Paper
			elevation={8}
			sx={{
				marginY: isMobile ? 2 : 4,
				padding: 0,
				borderRadius: 4,
				background: "linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)",
				marginX: isMobile ? 1 : "auto",
				maxWidth: isMobile ? "none" : "900px",
				overflow: "hidden",
				border: "1px solid rgba(0,0,0,0.05)",
			}}
		>
			<Box
				sx={{
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					color: "white",
					p: isMobile ? 2 : 3,
					position: "relative",
					overflow: "hidden",
					"&::before": {
						content: '""',
						position: "absolute",
						top: 0,
						right: 0,
						width: "100px",
						height: "100px",
						background: "rgba(255,255,255,0.1)",
						borderRadius: "50%",
						transform: "translate(30px, -30px)",
					},
				}}
			>
				<Typography
					variant={isMobile ? "h5" : "h4"}
					sx={{
						fontWeight: "bold",
						fontSize: isMobile ? "1.4rem" : "1.8rem",
						display: "flex",
						alignItems: "center",
						gap: 1.5,
						position: "relative",
						zIndex: 1,
					}}
				>
					<TrendingUpIcon fontSize="large" />
					Your Expenses
				</Typography>
			</Box>
			{!summaryLoading && summary && (
				<Box
					sx={{
						p: isMobile ? 2 : 3,
						background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
						color: "white",
						position: "relative",
						"&::before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							background: "rgba(255,255,255,0.05)",
							backdropFilter: "blur(10px)",
						},
					}}
				>
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
							gap: 2,
							position: "relative",
							zIndex: 1,
						}}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 1.5,
								p: 2,
								borderRadius: 3,
								background: "rgba(255,255,255,0.15)",
								backdropFilter: "blur(10px)",
								border: "1px solid rgba(255,255,255,0.2)",
							}}
						>
							<Avatar
								sx={{
									bgcolor: "rgba(255,255,255,0.2)",
									color: "white",
									width: 50,
									height: 50,
								}}
							>
								<ReceiptIcon />
							</Avatar>
							<Box>
								<Typography
									variant="h4"
									sx={{ fontWeight: "bold", lineHeight: 1 }}
								>
									{summary.totalExpenses || 0}
								</Typography>
								<Typography
									variant="body2"
									sx={{ opacity: 0.9 }}
								>
									Total Expenses
								</Typography>
							</Box>
						</Box>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 1.5,
								p: 2,
								borderRadius: 3,
								background: "rgba(255,255,255,0.15)",
								backdropFilter: "blur(10px)",
								border: "1px solid rgba(255,255,255,0.2)",
							}}
						>
							<Avatar
								sx={{
									bgcolor: "rgba(255,255,255,0.2)",
									color: "white",
									width: 50,
									height: 50,
								}}
							>
								<AccountBalanceWalletIcon />
							</Avatar>
							<Box>
								<Typography
									variant="h4"
									sx={{ fontWeight: "bold", lineHeight: 1 }}
								>
									₹{summary.totalAmount || "0.00"}
								</Typography>
								<Typography
									variant="body2"
									sx={{ opacity: 0.9 }}
								>
									Total Amount
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			)}
			{loading ? (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						py: isMobile ? 4 : 6,
						gap: 2,
					}}
				>
					<CircularProgress
						size={isMobile ? 50 : 60}
						sx={{
							color: "primary.main",
							"& .MuiCircularProgress-circle": {
								strokeLinecap: "round",
							},
						}}
					/>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ fontSize: "1.1rem" }}
					>
						Loading your expenses...
					</Typography>
				</Box>
			) : (
				<Box sx={{ p: isMobile ? 1 : 2 }}>
					{expenses.length === 0 ? (
						<Box
							sx={{
								textAlign: "center",
								py: isMobile ? 4 : 6,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: 2,
							}}
						>
							<Avatar
								sx={{
									width: 80,
									height: 80,
									bgcolor: "grey.100",
									color: "grey.400",
									fontSize: "2.5rem",
								}}
							>
								💰
							</Avatar>
							<Box>
								<Typography
									variant="h6"
									color="text.secondary"
									sx={{
										fontSize: isMobile ? "1.1rem" : "1.25rem",
										fontWeight: 500,
									}}
								>
									No expenses yet!
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ fontSize: isMobile ? "0.9rem" : "1rem", mt: 1 }}
								>
									Start tracking by adding your first expense
								</Typography>
							</Box>
						</Box>
					) : (
						<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
							{expenses.map((exp, index) => (
								<Card
									key={exp._id}
									elevation={2}
									sx={{
										borderRadius: 3,
										background:
											"linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
										border: "1px solid rgba(0,0,0,0.08)",
										transition: "all 0.3s ease",
										"&:hover": {
											transform: "translateY(-2px)",
											boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
										},
									}}
								>
									<CardContent
										sx={{
											p: isMobile ? 2 : 3,
											"&:last-child": { pb: isMobile ? 2 : 3 },
										}}
									>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													gap: 2,
													flex: 1,
												}}
											>
												<Avatar
													sx={{
														width: isMobile ? 45 : 55,
														height: isMobile ? 45 : 55,
														bgcolor: getCategoryColor(exp.category),
														color: "white",
														fontSize: isMobile ? "1.2rem" : "1.5rem",
													}}
												>
													{getCategoryIcon(exp.category)}
												</Avatar>
												<Box sx={{ flex: 1, minWidth: 0 }}>
													<Typography
														variant="h6"
														sx={{
															fontSize: isMobile ? "1rem" : "1.1rem",
															fontWeight: 600,
															color: "text.primary",
															mb: 0.5,
															overflow: "hidden",
															textOverflow: "ellipsis",
														}}
													>
														{exp.title}
													</Typography>
													<Box
														sx={{
															display: "flex",
															flexWrap: "wrap",
															gap: 1,
															alignItems: "center",
														}}
													>
														<Chip
															size="small"
															icon={
																<CategoryIcon sx={{ fontSize: "0.9rem" }} />
															}
															label={exp.category}
															sx={{
																bgcolor: `${getCategoryColor(exp.category)}20`,
																color: getCategoryColor(exp.category),
																fontWeight: 500,
																fontSize: "0.75rem",
															}}
														/>
														<Chip
															size="small"
															icon={
																<CalendarTodayIcon
																	sx={{ fontSize: "0.9rem" }}
																/>
															}
															label={new Date(exp.date).toLocaleDateString()}
															variant="outlined"
															sx={{
																fontSize: "0.75rem",
																color: "text.secondary",
															}}
														/>
													</Box>
												</Box>
											</Box>
											<Box
												sx={{ display: "flex", alignItems: "center", gap: 1 }}
											>
												<Typography
													variant="h5"
													sx={{
														fontWeight: "bold",
														color: "primary.main",
														fontSize: isMobile ? "1.1rem" : "1.3rem",
													}}
												>
													₹{exp.amount}
												</Typography>
												<IconButton
													onClick={() => onDeleteExpense(exp._id)}
													sx={{
														color: "error.main",
														"&:hover": {
															bgcolor: "error.light",
															color: "white",
														},
														transition: "all 0.2s ease",
													}}
													size={isMobile ? "small" : "medium"}
												>
													<DeleteIcon
														fontSize={isMobile ? "small" : "medium"}
													/>
												</IconButton>
											</Box>
										</Box>
									</CardContent>
								</Card>
							))}
						</Box>
					)}
				</Box>
			)}
		</Paper>
	);
};

export default ExpenseList;
