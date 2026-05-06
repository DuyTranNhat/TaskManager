import { request } from '~/utils';
import axios from 'axios';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '~/Models';

export const LoginApi = async (form: LoginRequest) => {
    try {
        const response = await request.post<LoginResponse>('auth/login', form, { withCredentials: true });
        return response.data;
    } catch (err) {
        console.log('error from LoginAPI', err);
    }
};

export const RegisterApi = async (form: RegisterRequest) => {
    try {
        const response = await request.post<RegisterResponse>('auth/register', form);
        return response.data;
    } catch (err) {
        console.log('error from RegisterAPI', err);
    }
};

export const RefreshApi = async () => {
    const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/refresh`,
        {},
        { withCredentials: true },
    );
    return response.data;
};

export const LogoutApi = async () => {
    try {
        await request.post('auth/logout', {}, { withCredentials: true });
    } catch (err) {
        console.log('error from LogoutApi', err);
    }
};
