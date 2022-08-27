import {
	SignInContent,
	SignInResponse,
	SignUpContent,
	SignUpResponse,
	UserJiraLogin,
	UserJiraModel,
} from '../interface/userAuthentication';
import axiosClient from './axiosClient';

interface Payload<T> {
	statusCode: number;
	message: string;
	content: T;
	dateTime: string;
}

const userAPI = {
	register: (registerInfo: UserJiraModel) => {
		return axiosClient.post<Payload<SignUpContent>>('Users/signup', {
			...registerInfo,
		});
	},
	signIn: (loginInfo: UserJiraLogin) => {
		return axiosClient.post<Payload<SignInContent>>(
			'Users/signin',
			loginInfo
		);
	},
	validateToken: (token: string) => {
		return axiosClient.post<string>('Users/TestToken', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	// Và những còn lại liên quan đến user...
};

export default userAPI;
