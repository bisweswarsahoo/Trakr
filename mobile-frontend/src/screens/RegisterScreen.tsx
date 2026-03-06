import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { TextInputField } from "../components/ui/TextInputField";
import { Button } from "../components/ui/Button";
import { BaseCard } from "../components/ui/BaseCard";
import { api } from "../services/api";
import { colors, spacing, typography } from "../theme";

export const RegisterScreen = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation<any>();

	const onSubmit = async (data: any) => {
		try {
			setLoading(true);
			await api.post("/auth/register", {
				email: data.email,
				name: data.name,
				shop_name: data.shop_name,
				password: data.password,
			});

			Alert.alert("Success", "Registration successful! Please login.", [
				{ text: "OK", onPress: () => navigation.navigate("Login") },
			]);
		} catch (error: any) {
			Alert.alert(
				"Registration Failed",
				error.response?.data?.error || "An error occurred",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView contentContainerStyle={styles.scroll}>
				<View style={styles.header}>
					<Text style={styles.title}>Create Account</Text>
					<Text style={styles.subtitle}>Start tracking your shop expenses</Text>
				</View>

				<BaseCard>
					<Controller
						control={control}
						rules={{ required: "Name is required" }}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInputField
								label="Full Name"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors.name?.message as string}
							/>
						)}
						name="name"
					/>

					<Controller
						control={control}
						rules={{ required: "Shop Name is required" }}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInputField
								label="Shop Name"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors.shop_name?.message as string}
							/>
						)}
						name="shop_name"
					/>

					<Controller
						control={control}
						rules={{
							required: "Email is required",
							pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInputField
								label="Email"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								autoCapitalize="none"
								keyboardType="email-address"
								error={errors.email?.message as string}
							/>
						)}
						name="email"
					/>

					<Controller
						control={control}
						rules={{
							required: "Password is required",
							minLength: { value: 6, message: "Minimum 6 characters" },
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInputField
								label="Password"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								secureTextEntry
								error={errors.password?.message as string}
							/>
						)}
						name="password"
					/>

					<Button
						title="Register"
						onPress={handleSubmit(onSubmit)}
						loading={loading}
						style={{ marginTop: spacing.md }}
					/>
				</BaseCard>

				<View style={styles.footer}>
					<Text style={styles.footerText}>Already have an account? </Text>
					<Text
						style={styles.link}
						onPress={() => navigation.navigate("Login")}
					>
						Login
					</Text>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	scroll: {
		flexGrow: 1,
		justifyContent: "center",
		padding: spacing.lg,
	},
	header: {
		marginBottom: spacing.xl,
		alignItems: "center",
	},
	title: {
		...typography.h1,
		color: colors.text,
		marginBottom: spacing.sm,
	},
	subtitle: {
		...typography.body,
		color: colors.textSecondary,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: spacing.xl,
	},
	footerText: {
		color: colors.textSecondary,
		fontSize: 16,
	},
	link: {
		color: colors.primary,
		fontWeight: "bold",
		fontSize: 16,
	},
});
