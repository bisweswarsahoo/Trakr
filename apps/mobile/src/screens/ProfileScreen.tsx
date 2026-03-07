import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import { BaseCard, Button, TextInputField } from "@trakr/ui";
import { useAuthStore } from "../store";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, spacing, typography } from "@trakr/design-system";
import { getInitials } from "@trakr/utils";

export const ProfileScreen = () => {
	const { user, token, signIn, signOut } = useAuthStore();
	const [editing, setEditing] = useState(false);
	const [formName, setFormName] = useState(user?.name || "");
	const [saving, setSaving] = useState(false);

	const handleSave = async () => {
		try {
			setSaving(true);
			const res = await api.put("/users/me", { name: formName });
			if (token) {
				signIn(res.data, token);
			}
			setEditing(false);
		} catch (e: any) {
			Alert.alert(
				"Error",
				e.response?.data?.error || "Failed to update profile",
			);
		} finally {
			setSaving(false);
		}
	};

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
				<Text style={styles.title}>Profile</Text>
			</View>

			<BaseCard style={styles.card}>
				{editing ? (
					<View style={styles.editSection}>
						<TextInputField
							label="Full Name"
							value={formName}
							onChangeText={setFormName}
						/>
						<View style={styles.editActions}>
							<Button
								title="Cancel"
								variant="outline"
								onPress={() => {
									setEditing(false);
									setFormName(user?.name || "");
								}}
								style={styles.editButton}
							/>
							<Button
								title="Save"
								onPress={handleSave}
								loading={saving}
								style={styles.editButton}
							/>
						</View>
					</View>
				) : (
					<View style={styles.profileSection}>
						<View style={styles.avatar}>
							<Text style={styles.avatarText}>{getInitials(user?.name)}</Text>
						</View>
						<View style={styles.userInfo}>
							<Text style={styles.userName}>{user?.name}</Text>
							<Text style={styles.userEmail}>{user?.email}</Text>
						</View>
						<Button
							title="Edit"
							variant="outline"
							onPress={() => setEditing(true)}
							style={styles.editTriggerButton}
						/>
					</View>
				)}
			</BaseCard>

			<BaseCard style={styles.card}>
				<View style={styles.settingRow}>
					<Text style={styles.settingText}>Currency</Text>
					<Text style={styles.settingValue}>USD ($)</Text>
				</View>
				<View style={styles.divider} />
				<View style={styles.settingRow}>
					<Text style={styles.settingText}>Dark Mode</Text>
					<Text style={styles.settingValue}>Off</Text>
				</View>
			</BaseCard>

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
		...typography.h2,
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
		...typography.h3,
		fontWeight: "bold",
		color: colors.text,
	},
	userEmail: {
		...typography.caption,
		color: colors.textSecondary,
		marginTop: 2,
	},
	settingRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: spacing.sm,
	},
	settingText: {
		...typography.body,
		color: colors.text,
	},
	settingValue: {
		...typography.body,
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
	editSection: {
		paddingVertical: spacing.sm,
	},
	editActions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: spacing.md,
	},
	editButton: {
		flex: 1,
		marginLeft: spacing.xs,
	},
	editTriggerButton: {
		marginLeft: spacing.md,
		paddingHorizontal: spacing.sm,
		paddingVertical: spacing.xs,
	},
});
