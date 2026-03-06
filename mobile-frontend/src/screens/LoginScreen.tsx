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
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { api } from "../services/api";
import { useAuthStore } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, spacing } from "../theme";

export const LoginScreen = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation<any>();
	const { signIn } = useAuthStore();

	const onSubmit = async (data: any) => {
		try {
			setLoading(true);
			const res = await api.post("/auth/login", {
				email: data.email,
				password: data.password,
			});

			const { token, ...userData } = res.data;

			await AsyncStorage.setItem("userToken", token);
			api.defaults.headers.Authorization = `Bearer ${token}`;

			signIn(userData, token);
		} catch (error: any) {
			Alert.alert(
				"Login Failed",
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
					<Text style={styles.title}>Welcome Back</Text>
					<Text style={styles.subtitle}>Login to Trakr</Text>
				</View>

				<Card>
					<Controller
						control={control}
						rules={{
							required: "Email is required",
							pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
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
						rules={{ required: "Password is required" }}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
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
						title="Login"
						onPress={handleSubmit(onSubmit)}
						loading={loading}
						style={{ marginTop: spacing.md }}
					/>
				</Card>

				<View style={styles.footer}>
					<Text style={styles.footerText}>Don't have an account? </Text>
					<Text
						style={styles.link}
						onPress={() => navigation.navigate("Register")}
					>
						Register
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
		fontSize: 28,
		fontWeight: "bold",
		color: colors.text,
		marginBottom: spacing.sm,
	},
	subtitle: {
		fontSize: 16,
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
