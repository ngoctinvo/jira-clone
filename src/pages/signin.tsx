import React, { useEffect, useState } from 'react';
import { Alert, Button, Input, InputLabel, TextField } from '@mui/material';
import { useAuth } from '../context/auth.context';
import userAPI from '../services/userAPI';
import { useRouter } from 'next/router';

type Props = {};

const SignInPage = (props: Props) => {
	const router = useRouter();
	const { authState, authDispatch } = useAuth();
	const { isAuthenticated, token, user } = authState;
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/');
		}
	}, [isAuthenticated]);

	const handleSignIn = async () => {
		try {
			const data = await userAPI.signIn({
				email: email,
				password: password,
			});
			// Case: wrong credentials
			if (!data.content) {
				console.log('Sai tài khoản/mật khẩu');
				return;
			}
			// Case: correct credentials
			console.log(data);
			authDispatch({
				type: 'UPDATE_USER',
				payload: data.content,
			});
			authDispatch({
				type: 'STORE_TOKEN',
				payload: data.content.accessToken,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleSignOut = () => {};

	return (
		<div>
			<h1>Sign In</h1>
			<form>
				<TextField
					label="Email"
					type="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					label="Password"
					type="password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</form>
			<Button variant="contained" onClick={handleSignIn}>
				Sign in
			</Button>
		</div>
	);
};
SignInPage.authDisabled = true;

export default SignInPage;
