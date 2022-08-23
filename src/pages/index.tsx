import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import AppLayout from '../containers/AppLayout';
import { useAuth } from '../context/auth.context';
import styles from '../styles/Home.module.css';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
	const { authState, authDispatch } = useAuth();
	const { isAuthenticated, token, user } = authState;
	const router = useRouter();

	return (
		<div>
			<Head>
				<title>Jira</title>
				<meta
					name="description"
					content="Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software."
				/>
			</Head>
			<h1>Index page</h1>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <AppLayout>{page}</AppLayout>;
};

export default Home;
