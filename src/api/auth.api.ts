import { LoginParams, SignupParams } from '../interface/user/login';
import {  request   } from './request';

export const apiLogin = (data: LoginParams) => request<any>('post', '/auth/login', data);

export const apiRegister = (data: SignupParams) => request<any>('post', '/auth/register', data);

export const apiLogout = (data: any) => request<any>('post', '/auth/logout', data);

