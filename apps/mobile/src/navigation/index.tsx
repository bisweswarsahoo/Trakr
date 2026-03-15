import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useThemeContext } from "@trakr/ui";
import { useAuthStore } from "../store";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { DashboardScreen } from "../screens/DashboardScreen";
import { ExpensesScreen } from "../screens/ExpensesScreen";
import { IncomeScreen } from "../screens/IncomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { Home, TrendingDown, TrendingUp, User } from "lucide-react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
	const { colors } = useThemeContext();

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: colors.semantic.info[500],
				tabBarInactiveTintColor: colors.text.secondary,
				tabBarStyle: {
					backgroundColor: colors.background.surface,
					borderTopColor: colors.border.light,
				},
			}}
		>
			<Tab.Screen
				name="Dashboard"
				component={DashboardScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Home color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Expenses"
				component={ExpensesScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<TrendingDown color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Income"
				component={IncomeScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<TrendingUp color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
				}}
			/>
		</Tab.Navigator>
	);
}

export default function AppNavigator() {
	const token = useAuthStore((state) => state.token);

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{token == null ? (
					<>
						<Stack.Screen
							name="Login"
							component={LoginScreen}
						/>
						<Stack.Screen
							name="Register"
							component={RegisterScreen}
						/>
					</>
				) : (
					<Stack.Screen
						name="Home"
						component={AppTabs}
					/>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
