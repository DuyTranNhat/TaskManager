import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Icon } from '~/components';
import type { EditProfileRequest } from '~/Models';
import { useAuth } from '~/Context';

const editProfileSchema = yup.object({
    fullName: yup.string().required('Vui lòng nhập họ tên').min(6, 'Tối thiểu 6 ký tự!').max(20, 'Tối đa 20 ký tự'),
    email: yup.string().required('Vui lòng nhập email!').email('Sai định dạng email'),
});


const EditProfile = ({ title }: { title: string }) => {
        const { user, editProfileUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EditProfileRequest>({
        defaultValues: {
            fullName: '',
            email: '',
        },
        resolver: yupResolver(editProfileSchema),
    });

    useEffect(() => {
        if (user) {
            reset({
                fullName: user.fullName,
                email: user.email,
            });
        }
    }, [user, reset]);

    const onSubmit = async (form: EditProfileRequest) => {
        editProfileUser(form);
    };
    
    return (
           <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center gap-1">
                <Icon.UserCircleIcon className="text-main inline-block" />
                <span className="text-md font-bold">Thông tin cá nhân</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                <div className="flex flex-col justify-center">
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
                    <button
                        type="submit"
                        className="bg-gradient-color my-2 flex h-8 w-full cursor-pointer items-center justify-center gap-[6px] rounded-lg font-bold text-white hover:shadow-lg"
                    >
                        <Icon.SaveChangesIcon className="inline-block" />
                        <span className="mt-[2px] inline-block">Cập nhật</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
