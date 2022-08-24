import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/auth.context';

type Props = {
	children: React.ReactElement;
};

const ProtectedRoute = ({ children }: Props) => {
	const router = useRouter();
	const { authState } = useAuth();
	const { isAuthenticated } = authState;

	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/signin');
		}
	}, [isAuthenticated]);

	if (!isAuthenticated) {
		return null;
	}

	return children;
};

export default ProtectedRoute;
