import * as React from 'react';
import { NextPage } from 'next';
import { useAuth } from '../context/AuthContext';

interface Props {}

const DashboardPage: NextPage<Props> = () => {
	const { user, login, logout } = useAuth();

	if (!user) {
		return <div>Need to login</div>;
	}

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Login success</p>
		</div>
	);
};
export default DashboardPage;
