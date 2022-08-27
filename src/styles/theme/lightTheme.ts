import { createTheme, ThemeOptions } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
	palette: {
		mode: 'light',
		primary: {
			main: '#0052CC',
		},
	},
	components: {
		MuiMenuItem: {
			styleOverrides: {
				root: {
					fontSize: '14px',
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				root: {
					fontSize: 14,
				},
			},
		},
	},
};

export const lightTheme = createTheme(lightThemeOptions);
