import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuthStore } from "../store";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { DashboardScreen } from "../screens/DashboardScreen";
import { ExpensesScreen } from "../screens/ExpensesScreen";
import { IncomeScreen } from "../screens/IncomeScreen";
import { ReportsScreen } from "../screens/ReportsScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name="Dashboard"
				component={DashboardScreen}
			/>
			<Tab.Screen
				name="Expenses"
				component={ExpensesScreen}
			/>
			<Tab.Screen
				name="Income"
				component={IncomeScreen}
			/>
			<Tab.Screen
				name="Reports"
				component={ReportsScreen}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
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
