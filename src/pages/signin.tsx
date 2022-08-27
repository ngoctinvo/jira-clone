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
import SignInButton from '../components/shared/SignInButton';
import SignInForm from '../components/features/auth/SignInForm';
import SignUpForm from '../components/features/auth/SignUpForm';
import { ToastContainer } from 'react-toastify';

type Props = {};

export enum ActionType {
	SIGN_IN = 'SIGN_IN',
	SIGN_UP = 'SIGN_UP',
	FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

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
	const [isLoading, setIsLoading] = useState(false);
	const [pageType, setPageType] = useState(ActionType.SIGN_IN);
	const schema = yup
		.object({
			email: yup.string().email().required(),
			password: yup.string().required(),
		})
		.required();

	const formControls = useForm({ resolver: yupResolver(schema) });

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/');
		}
	}, [isAuthenticated]);

	const handleSignOut = () => {};

	return (
		<div>
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
					{
						{
							SIGN_IN: (
								<SignInForm
									formControls={formControls}
									isLoading={isLoading}
									setIsLoading={setIsLoading}
									setPageType={setPageType}
								/>
							),
							SIGN_UP: <SignUpForm setPageType={setPageType} />,
							FORGOT_PASSWORD: null,
						}[pageType]
					}
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</div>
	);
};
SignInPage.authDisabled = true;

export default SignInPage;
