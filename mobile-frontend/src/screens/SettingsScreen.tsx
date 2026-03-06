import React from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useAuthStore } from "../store";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, spacing } from "../theme";

export const SettingsScreen = () => {
	const { user, signOut } = useAuthStore();

	const handleLogout = async () => {
		Alert.alert("Logout", "Are you sure you want to log out?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Logout",
				style: "destructive",
				onPress: async () => {
					try {
						await api.post("/auth/logout");
					} catch (e) {
						// Ignore logout API errors
					}
					await AsyncStorage.removeItem("userToken");
					signOut();
				},
			},
		]);
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Settings</Text>
			</View>

			<Card style={styles.card}>
				<View style={styles.profileSection}>
					<View style={styles.avatar}>
						<Text style={styles.avatarText}>
							{user?.name?.[0]?.toUpperCase()}
						</Text>
					</View>
					<View style={styles.userInfo}>
						<Text style={styles.userName}>{user?.name}</Text>
						<Text style={styles.userEmail}>{user?.email}</Text>
					</View>
				</View>
			</Card>

			<Card style={styles.card}>
				<View style={styles.settingRow}>
					<Text style={styles.settingText}>Shop Name</Text>
					<Text style={styles.settingValue}>{user?.shop_name}</Text>
				</View>
				<View style={styles.divider} />
				<View style={styles.settingRow}>
					<Text style={styles.settingText}>Currency</Text>
					<Text style={styles.settingValue}>USD ($)</Text>
				</View>
				<View style={styles.divider} />
				<View style={styles.settingRow}>
					<Text style={styles.settingText}>Dark Mode</Text>
					<Text style={styles.settingValue}>Off</Text>
				</View>
			</Card>

			<Button
				title="Logout"
				variant="danger"
				onPress={handleLogout}
				style={styles.logoutButton}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	header: {
		padding: spacing.lg,
		paddingTop: spacing.xxl,
		backgroundColor: colors.surface,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
		marginBottom: spacing.md,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.text,
	},
	card: {
		marginHorizontal: spacing.lg,
		marginBottom: spacing.md,
	},
	profileSection: {
		flexDirection: "row",
		alignItems: "center",
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: colors.primary,
		alignItems: "center",
		justifyContent: "center",
		marginRight: spacing.md,
	},
	avatarText: {
		color: colors.surface,
		fontSize: 24,
		fontWeight: "bold",
	},
	userInfo: {
		flex: 1,
	},
	userName: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.text,
	},
	userEmail: {
		fontSize: 14,
		color: colors.textSecondary,
		marginTop: 2,
	},
	settingRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: spacing.sm,
	},
	settingText: {
		fontSize: 16,
		color: colors.text,
	},
	settingValue: {
		fontSize: 16,
		color: colors.textSecondary,
		fontWeight: "500",
	},
	divider: {
		height: 1,
		backgroundColor: colors.border,
		marginVertical: spacing.sm,
	},
	logoutButton: {
		marginHorizontal: spacing.lg,
		marginTop: spacing.xl,
	},
});
