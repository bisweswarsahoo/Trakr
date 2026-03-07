import { AuthForm } from "../components/auth";

const Login = ({ onLogin }) => {
	return (
		<AuthForm
			mode="login"
			onLogin={onLogin}
		/>
	);
};

export default Login;
