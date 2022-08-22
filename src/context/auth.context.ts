import { createContext, Dispatch, useContext } from 'react';
const isBrowser = typeof window !== 'undefined';

export type authContextType = {
	authState: {
		isAuthenticated: boolean;
		token: string;
		user: null;
	};
	authDispatch: Dispatch<any>;
};

const authContextDefaultValues: authContextType = {
	authState: {
		isAuthenticated: isBrowser && !!localStorage.getItem('access_token'),
		token: isBrowser ? localStorage.getItem('access_token') || '' : '',
		user: null,
	},
	authDispatch: () => {},
};

export const AuthContext = createContext(authContextDefaultValues);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
};
