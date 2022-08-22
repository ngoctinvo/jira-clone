import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import '../styles/globals.css';
import { AuthProvider } from '../context/auth.provider';
import { NextPage } from 'next';
import darkThemeOptions from '../styles/theme/darkThemeOptions';
import AppLayout from '../containers/AppLayout';

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};
interface MyAppProps extends AppProps {
	Component: NextPageWithLayout;
	emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const darkTheme = createTheme(darkThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;

	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<AuthProvider>
					{getLayout(<Component {...pageProps} />)}
				</AuthProvider>
			</ThemeProvider>
		</CacheProvider>
	);
};

export default MyApp;
