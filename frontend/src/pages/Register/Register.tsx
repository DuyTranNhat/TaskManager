import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import config from '~/config';
import { Icon } from '~/components';
import { type RegisterRequest } from '~/Models';
import { useAuth } from '~/Context';

const validateSchema = yup.object({
    fullName: yup.string().required('Vui lòng nhập họ tên').min(6, 'Tối thiểu 6 ký tự!').max(20, 'Tối đa 20 ký tự'),
    email: yup.string().required('Vui lòng nhập email!').email('Sai định dạng email'),
    password: yup.string().required('Vui lòng nhập mật khẩu!').min(6, 'Tối thiểu 6 ký tự!').max(20, 'Tối đa 20 ký tự'),
});

const Register = ({ title }: { title: string }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
    const { registerUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterRequest>({
        resolver: yupResolver(validateSchema),
    });

    const onSubmit = (form: RegisterRequest) => {
        registerUser(form);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="min-h-[50%] min-w-[25%]">
            <div className="login-box">
                <Icon.RegisterIcon className="bg-gradient-color m-5 self-center rounded-full p-3 text-white" />
                <h1 className="self-center text-3xl font-bold">Tạo tài khoản</h1>
                <p className="my-2 self-center text-xs">Tham gia TaskManager để quản lý công việc của bạn</p>
                <div className="form-input">
                    <Icon.UserIcon className="text-side mr-2" />
                    <input
                        className="flex-1 caret-(--color-main) outline-none"
                        type="text"
                        spellCheck={false}
                        {...register('fullName')}
                        placeholder="Họ tên"
                    />
                </div>
                {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                <div className="form-input">
                    <Icon.EmailIcon className="text-side mr-2" />
                    <input
                        className="flex-1 caret-(--color-main) outline-none"
                        type="email"
                        spellCheck={false}
                        {...register('email')}
                        placeholder="Email"
                    />
                </div>
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                <div className="form-input">
                    <Icon.PasswordIcon className="text-side mr-2" />
                    <input
                        className="flex-1 caret-(--color-main) outline-none"
                        type="password"
                        spellCheck={false}
                        {...register('password')}
                        placeholder="Mật khẩu"
                    />
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                <button
                    type="submit"
                    className="bg-gradient-color my-2 h-8 w-full cursor-pointer rounded-lg font-bold text-white hover:shadow-lg"
                >
                    Đăng ký
                </button>
                <div className="mt-2 text-center text-sm">
                    <p className="mr-1 inline-block">Bạn đã có tài khoản?</p>
                    <Link className="text-main hover:underline" to={config.routes.login}>
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default Register;
