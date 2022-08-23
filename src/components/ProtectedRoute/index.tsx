import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/auth.context';

type Props = {
	children: React.ReactNode;
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

	if (isAuthenticated) {
		return <>{children}</>;
	}

	return <div>Loading</div>;
};

export default ProtectedRoute;
