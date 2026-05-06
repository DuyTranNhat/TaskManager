import Joi from 'joi';

export const editProfileSchema = Joi.object({
    fullName: Joi.string().min(6).max(20).required().messages({
        'string.empty': 'Vui lòng nhập họ tên',
        'string.min': 'Tối thiểu 6 ký tự!',
        'string.max': 'Tối đa 20 ký tự',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Vui lòng nhập email!',
        'string.email': 'Sai định dạng email',
    }),
});

export const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().required().messages({
        'string.empty': 'Vui lòng nhập mật khẩu hiện tại!',
    }),
    newPassword: Joi.string().min(6).max(20).required().messages({
        'string.empty': 'Vui lòng nhập mật khẩu mới!',
        'string.min': 'Tối thiểu 6 ký tự!',
        'string.max': 'Tối đa 20 ký tự',
    }),
});
