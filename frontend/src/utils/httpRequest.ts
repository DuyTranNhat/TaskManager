import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { callRefreshHandler } from '~/utils/authService';

import { handleError } from '~/Helpers';

const httpRequest = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/`,
    timeout: 10000,
});

httpRequest.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

httpRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log('error from interceptor', error);
        if (error.response) {
            // handle refresh access token
            const originalRequest = error.config;
            if (
                error.response?.status === 401 &&
                !originalRequest._retry &&
                !originalRequest.url.includes('/refresh')
            ) {
                originalRequest._retry = true;
                return callRefreshHandler(httpRequest, originalRequest, handleError);
            }

            // Global Error handler
            handleError(error);
        } else if (error.request) {
            toast.error('Không nhận được phản hồi từ server');
        } else {
            toast.error('Lỗi cấu hình request', error.message);
        }

        return Promise.reject(error);
    },
);

export default httpRequest;
