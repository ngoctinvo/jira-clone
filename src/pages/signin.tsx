import React, { ReactNode, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import * as yup from 'yup';
import {
	Alert,
	Box,
	Button,
	Container,
	Grid,
	Input,
	InputLabel,
	TextField,
} from '@mui/material';
import { useAuth } from '../context/auth.context';
import userAPI from '../services/userAPI';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BrandLogo from '../components/icons/BrandLogo';

type Props = {};

function Copyright(props: any) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link
				color="inherit"
				href="https://www.atlassian.com/software/jira"
			>
				Jira
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const SignInPage = (props: Props) => {
	const router = useRouter();
	const { authState, authDispatch } = useAuth();
	const { isAuthenticated, token, user } = authState;
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const schema = yup
		.object({
			email: yup
				.string()
				.email('Email không hợp lệ')
				.required('Trường này là bắt buộc'),
			password: yup.string().required('Mật khẩu không được để trống'),
		})
		.required();

	const {
		formState: { errors },
		control,
		handleSubmit,
	} = useForm({ resolver: yupResolver(schema) });

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
			console.log(data);
			// Case: wrong credentials
			if (!data.accessToken) {
				console.log('Sai tài khoản/mật khẩu');
				return;
			}
			// Case: correct credentials
			console.log(data);
			authDispatch({
				type: 'UPDATE_USER',
				payload: data,
			});
			authDispatch({
				type: 'STORE_TOKEN',
				payload: data.accessToken,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleSignOut = () => {};

	return (
		<div>
			{/* <h1 className="text-red-500">Sign In</h1>
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
			</Button> */}
			<Container component="main" maxWidth="xs">
				<div className="w-2/3 mx-auto">
					<BrandLogo className="" />
				</div>
				<Box
					sx={{
						marginTop: 4,
						padding: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 10px',
					}}
				>
					<Box
						component="form"
						onSubmit={handleSignIn}
						sx={{ mt: 1 }}
					>
						<Typography align="center" className="font-bold">
							Log in to your account
						</Typography>
						<Controller
							name="email"
							defaultValue=""
							control={control}
							render={({ field }) => (
								<TextField
									error={!!errors?.password}
									label="Email"
									helperText={
										errors?.password?.message as ReactNode
									}
									type="email"
									autoComplete="email"
									fullWidth
									required
									margin="normal"
									{...field}
								/>
							)}
						/>
						<Controller
							name="password"
							defaultValue=""
							control={control}
							render={({ field }) => (
								<TextField
									error={!!errors?.password}
									label="Password"
									helperText={
										errors?.password?.message as ReactNode
									}
									type="password"
									autoComplete="current-password"
									fullWidth
									required
									{...field}
								/>
							)}
						/>

						<FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</div>
	);
};
SignInPage.authDisabled = true;

export default SignInPage;
