import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme, StyledEngineProvider } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { NextPage } from 'next';

import '../styles/globals.css';
import createEmotionCache from '../utility/createEmotionCache';
import { AuthProvider } from '../context/auth.provider';

import { lightTheme } from '../styles/theme/lightTheme';
import { darkTheme } from '../styles/theme/darkTheme';
import ProtectedRoute from '../components/features/auth/ProtectedRoute';

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: React.ReactElement) => React.ReactElement;
	authDisabled?: boolean;
};
interface MyAppProps extends AppProps {
	Component: NextPageWithLayout;
	emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;

	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		// <StyledEngineProvider injectFirst>
			<ThemeProvider theme={lightTheme}>
				<CssBaseline />
				<AuthProvider>
					{!Component.authDisabled ? (
						<ProtectedRoute>
							{getLayout(<Component {...pageProps} />)}
						</ProtectedRoute>
					) : (
						<>{getLayout(<Component {...pageProps} />)}</>
					)}
				</AuthProvider>
			</ThemeProvider>
		// </StyledEngineProvider>
	);
};

export default MyApp;
