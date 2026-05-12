import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Icon } from '~/components';
import { useAuth } from '~/Context';

type ChangePasswordForm = yup.InferType<typeof changePasswordSchema>;

const changePasswordSchema = yup.object({
    oldPassword: yup.string().required('Vui lòng nhập mật khẩu hiện tại!'),
    newPassword: yup
        .string()
        .required('Vui lòng nhập mật khẩu mới!')
        .min(6, 'Tối thiểu 6 ký tự!')
        .max(20, 'Tối đa 20 ký tự'),
    confirmPassword: yup
        .string()
        .required('Vui lòng nhập lại mật khẩu mới!')
        .oneOf([yup.ref('newPassword')], 'Mật khẩu nhập lại không khớp'),
});

const ChangePassword = () => {
    const { changePassword } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordForm>({
        resolver: yupResolver(changePasswordSchema),
    });

    const onSubmit = (form: ChangePasswordForm) => {
        changePassword({
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
        });
    };

    return (
        <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center gap-1">
                <Icon.SecurityIcon className="text-main inline-block" />
                <span className="text-md font-bold">Bảo mật</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                <div className="flex flex-col justify-center">
                    <div className="form-input">
                        <Icon.PasswordIcon className="text-side mr-2" />
                        <input
                            className="flex-1 caret-(--color-main) outline-none"
                            type="text"
                            spellCheck={false}
                            {...register('oldPassword')}
                            placeholder="Mật khẩu hiện tại"
                        />
                    </div>
                    {errors.oldPassword && <p className="text-xs text-red-500">{errors.oldPassword.message}</p>}
                    <div className="form-input">
                        <Icon.PasswordIcon className="text-side mr-2" />
                        <input
                            className="flex-1 caret-(--color-main) outline-none"
                            type="text"
                            spellCheck={false}
                            {...register('newPassword')}
                            placeholder="Mật khẩu mới"
                        />
                    </div>
                    {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword.message}</p>}
                    <div className="form-input">
                        <Icon.PasswordIcon className="text-side mr-2" />
                        <input
                            className="flex-1 caret-(--color-main) outline-none"
                            type="text"
                            spellCheck={false}
                            {...register('confirmPassword')}
                            placeholder="Xác nhận mật khẩu"
                        />
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
                    <button
                        type="submit"
                        className="bg-gradient-color my-2 flex h-8 w-full cursor-pointer items-center justify-center gap-[6px] rounded-lg font-bold text-white hover:shadow-lg"
                    >
                        <Icon.SecurityIcon className="inline-block" />
                        <span className="mt-[2px] inline-block">Đổi mật khẩu</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
