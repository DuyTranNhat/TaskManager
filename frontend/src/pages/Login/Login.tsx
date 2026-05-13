import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import config from '~/config';
import { Icon } from '~/components';
import type { LoginRequest } from '~/Models';
import { useAuth } from '~/Context';

const validateSchema = yup.object({
    email: yup.string().required('Vui lòng nhập email!').email('Sai định dạng email'),
    password: yup.string().required('Vui lòng nhập mật khẩu!'),
});


const Login = ({ title }: { title: string }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
    const { loginUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>({
        resolver: yupResolver(validateSchema),
    });

    const onSubmit = async (form: LoginRequest) => {
        loginUser(form);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="min-h-[50%] min-w-[25%]">
            <div className="login-box">
                <Icon.LogInIcon className="bg-gradient-color m-5 self-center rounded-full p-3 text-white" />
                <h1 className="self-center text-3xl font-bold">Chào mừng</h1>
                <p className="my-2 self-center text-xs">Đăng nhập để tiếp tục với TaskManager</p>
                <div className="form-input">
                    <Icon.EmailIcon className="text-side mr-2" />
                    <input
                        className="flex-1 caret-(--color-main) outline-none"
                        type="email"
                        value={'user1@gmail.com'}
                        placeholder="Email"
                        spellCheck={false}
                        {...register('email')}
                    />
                </div>
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                <div className="form-input">
                    <Icon.PasswordIcon className="text-side mr-2" />
                    <input
                        className="flex-1 caret-(--color-main) outline-none"
                        type="password"
                        value={'user1@gmail.com'}
                        placeholder="Mật khẩu"
                        spellCheck={false}
                        {...register('password')}
                    />
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                <div className="my-1 flex items-center">
                    <input type="checkbox" className="accent-(--color-side)" />
                    <label className="ml-1 text-sm">Nhớ thông tin</label>
                </div>

                <button
                    type="submit"
                    className="bg-gradient-color my-2 h-8 w-full cursor-pointer rounded-lg font-bold text-white hover:shadow-lg"
                >
                    Đăng nhập
                </button>
                <div className="mt-2 text-center text-sm">
                    <p className="mr-1 inline-block">Bạn chưa có tài khoản?</p>
                    <Link className="text-main hover:underline" to={config.routes.register}>
                        Đăng ký
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default Login;
