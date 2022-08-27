import MenuIcon from '@mui/icons-material/Menu';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Avatar from '@mui/material/Avatar';
import LaunchIcon from '@mui/icons-material/Launch';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../context/auth.context';
import styles from './styles.module.scss';
import logo from '/public/images/logocute.png';
import logoIconSVG from '../../../public/logoIcon.svg';
import { AppBar, Divider, ListItemIcon, ListItemText } from '@mui/material';
import { bgcolor } from '@mui/system';

const Header = () => {
	const router = useRouter();
	const {
		authState: { isAuthenticated, user },
		authDispatch,
	} = useAuth();
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event: any) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: any) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	// const handleShowAuth = (show) => {
	// 	setShowAuth(show);
	// };

	let pages = [
		{
			label: 'Tra cứu',
			url: '/',
		},
		{
			label: 'Luyện viết',
			url: '/writing',
		},
		{ label: 'Đóng góp', url: '/contribution' },
		{ label: 'Về chúng tớ', url: '/about' },
	];

	// if (user?.type === 'ADMIN') {
	// 	pages.push({
	// 		label: 'Quản lý từ',
	// 		url: '/management',
	// 	});
	// }

	const jiraOptions = [
		{
			label: 'Profile',
			event: () => {
				router.push('/account');
			},
		},
		{
			label: 'Personal Settings',
			event: () => {
				router.push('/account');
			},
		},
		{
			label: 'Log out',
			event: () => {
				authDispatch({
					type: 'LOGOUT',
				});
			},
		},
	];

	return (
		<AppBar position="static" color="inherit">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						<Button
							sx={{
								color: '#000',
								textTransform: 'capitalize',
								fontSize: 20,
							}}
						>
							<Image
								src={logoIconSVG}
								width={30}
								height={30}
								alt="logo"
								priority
							/>
							Jira Software
						</Button>
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page) => (
								<Link href={page.url} key={uuidv4()}>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography textAlign="center">
											{page.label}
										</Typography>
									</MenuItem>
								</Link>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						<Image
							src={logo}
							width={40}
							height={40}
							alt="logo"
							priority
						/>
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
							ml: 2,
						}}
					>
						{/* {pages.map((page) => (
							<Link href={page.url} key={uuidv4()}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										mr: 2,
										color: 'white',
										display: 'block',
										position: 'relative',
									}}
									className={
										router.asPath === page.url
											? styles.active
											: ''
									}
								>
									{page.label}
								</Button>
							</Link>
						))} */}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title={user?.email || 'Settings'}>
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<Avatar
									src={user?.avatar}
									alt={user?.email || 'Avatar'}
								>
									<PersonRoundedIcon />
								</Avatar>
							</IconButton>
						</Tooltip>
					</Box>
					<Menu
						sx={{ mt: '45px' }}
						id="menu-appbar"
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						<Box px={2} py={1}>
							<Typography
								variant="h6"
								sx={{ fontSize: 11, fontWeight: 700 }}
							>
								ACCOUNT
							</Typography>
							<Box display="flex" mt={2}>
								<Avatar
									src={user?.avatar}
									alt={user?.email || 'Avatar'}
								>
									<PersonRoundedIcon />
								</Avatar>
								<Box ml={1}>
									<Typography sx={{ fontSize: 14 }}>
										{user?.name}
									</Typography>
									<Typography variant="caption">
										{user?.email}
									</Typography>
								</Box>
							</Box>
						</Box>
						<MenuItem>
							<ListItemText disableTypography>
								Manage Account
							</ListItemText>
							<ListItemIcon>
								<LaunchIcon />
							</ListItemIcon>
						</MenuItem>

						<Divider />
						<Typography
							px={2}
							py={1}
							variant="h6"
							sx={{ fontSize: 11, fontWeight: 700 }}
						>
							UPGRADE
						</Typography>
						<MenuItem>
							<ListItemText disableTypography>
								Try the Standard plan
							</ListItemText>
							<Typography
								color="HighlightText"
								sx={{
									ml: 1,
									borderRadius: '3px',
									fontWeight: 700,
									p: '2px 3px',
									fontSize: 11,
									bgcolor: 'primary.main',
								}}
							>
								FREE 14-DAY TRIAL
							</Typography>
						</MenuItem>

						<Divider />

						<Typography
							px={2}
							py={1}
							variant="h6"
							sx={{ fontSize: 11, fontWeight: 700 }}
						>
							JIRA
						</Typography>
						{jiraOptions.map((option, i, arr) => (
							<>
								{arr.length - 1 === i && <Divider />}
								<MenuItem
									key={uuidv4()}
									onClick={() => {
										option.event();
										handleCloseUserMenu();
									}}
								>
									{option.label}
								</MenuItem>
							</>
						))}
					</Menu>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Header;
