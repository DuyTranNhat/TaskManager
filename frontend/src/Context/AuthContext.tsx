/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

import { LoginApi, RegisterApi, EditProfileApi, ChangePasswordApi, LogoutApi, RefreshApi } from '~/services';
import type {
    UserProfile,
    LoginRequest,
    RegisterRequest,
    EditProfileRequest,
    ChangePasswordRequest,
    LoginResponse,
    RegisterResponse,
} from '~/Models';
import { registerRefreshHandler } from '~/utils/authService';

type UserContextType = {
    user: UserProfile | null;
    loginUser: (form: LoginRequest) => void;
    registerUser: (form: RegisterRequest) => void;
    logoutUser: () => void;
    editProfileUser: (form: EditProfileRequest) => void;
    changePassword: (form: ChangePasswordRequest) => void;
};

const AuthContext = createContext<UserContextType>({} as UserContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(() => {
        const storeUser = localStorage.getItem('user');
        const accessTokenCookie = Cookies.get('accessToken');
        return storeUser && accessTokenCookie ? JSON.parse(storeUser) : null;
    });

    const handleRefreshToken = useCallback(async (httpRequest: any, originalRequest: any, handleError: any) => {
        try {
            const data = await RefreshApi();
            const newAccessToken = data.accessToken;
            Cookies.set('accessToken', newAccessToken, { expires: 7 });
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return httpRequest(originalRequest);
        } catch (refreshError) {
            Cookies.remove('accessToken');
            setUser(null);
            localStorage.removeItem('user');
            handleError(refreshError);
            return Promise.reject(refreshError);
        }
    }, []);

    useEffect(() => {
        registerRefreshHandler(handleRefreshToken);
    }, [handleRefreshToken]);

    const navigate = useNavigate();
    const location = useLocation();

    const loginHandler = (data: (LoginResponse | RegisterResponse) | undefined) => {
        if (data) {
            const redirectTo = location.state?.from?.pathname || '/';
            toast.success('Đăng nhập thành công');
            Cookies.set('accessToken', data.accessToken, { expires: 7 });
            navigate(redirectTo, { replace: true });
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
    };

    const loginUser = async (form: LoginRequest) => {
        const LoginRequestDto: LoginRequest = {
            email: form.email,
            password: form.password,
        };
        const data = await LoginApi(LoginRequestDto);
        loginHandler(data);
    };

    const registerUser = async (form: RegisterRequest) => {
        const data = await RegisterApi(form);
        loginHandler(data);
    };

    const logoutUser = async () => {
        if (!user) {
            toast.warning('Không thể đăng xuất khi chưa đăng nhập');
            return;
        }
        await LogoutApi();
        Cookies.remove('accessToken');
        setUser(null);
        localStorage.removeItem('user');
        toast.success('Đăng xuất thành công');
        navigate('/login');
    };

    const editProfileUser = async (form: EditProfileRequest) => {
        try {
            const data = await EditProfileApi(form);
            if (data) {
                toast.success(data.message);
                const user: UserProfile = {
                    userId: data.user.userId,
                    email: data.user.email,
                    fullName: data.user.fullName,
                };
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
            }
        } catch (err: any) {
            if (
                err.response?.status === 401 ||
                (err.response?.status === 403 &&
                    (err.response?.data?.code === 'REFRESH_EXPIRED' || err.response?.data?.code === 'REFRESH_INVALID'))
            ) {
                navigate('/login');
            } else {
                console.error(err);
            }
        }
    };

    const changePassword = async (form: ChangePasswordRequest) => {
        try {
            const data = await ChangePasswordApi(form);
            if (data) {
                toast.success(data.message);
                toast.info('Vui lòng đăng nhập lại!');
                Cookies.remove('accessToken');
                setUser(null);
                localStorage.removeItem('user');

                navigate('/login');
            }
        } catch (err: any) {
            if (
                err.response?.status === 401 ||
                (err.response?.status === 403 &&
                    (err.response?.data?.code === 'REFRESH_EXPIRED' || err.response?.data?.code === 'REFRESH_INVALID'))
            ) {
                navigate('/login');
            } else {
                console.error(err);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, registerUser, editProfileUser, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
