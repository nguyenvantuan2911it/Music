export type Role = 'guest' | 'admin';

export interface LoginParams {
	credentials: {
		email: string;
		password: string;
	};
}

export interface LoginPhoneParams {
	phone?: string;
	otp?: string;
}

export interface SignupParams {
	data: {
		email: string;
		firstName?: string;
		lastName?: string;
		companyName?: string;
		password: string;
		confirm_password?: string;
		businessTypeString?: string;
	};
}

export interface VerifyParams {
	otp: string;
}

export interface LoginResult {
	token: string;
	username: string;
	role: Role;
}

export interface ForgotPasswordPhoneParams {
	phone: string;
	password: string;
	confirm_password: string;
	otp: string;
}

export interface ForgotChangePasswordParams {
	password: string;
	confirm_password: string;
}

export interface ForgotPasswordEmailParams {
	email: string;
}

export interface SignupResult {
	message: string;
	verifyToken: string;
}

export interface LogoutParams {
	token: string;
}

export interface LogoutResult {}
