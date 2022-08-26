import {
	SignInContent,
	SignInResponse,
	SignUpResponse,
	UserJiraLogin,
	UserJiraModel,
} from '../interface/userAuthentication';
import axiosClient from './axiosClient';

interface Payload {
	content: SignInContent;
}

const userAPI = {
	register: (registerInfo: UserJiraModel) => {
		return axiosClient.post<SignUpResponse | string>('Users/signup', {
			...registerInfo,
		});
	},
	signIn: (loginInfo: UserJiraLogin) => {
		return axiosClient.post<SignInContent>('Users/signin', loginInfo);
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
