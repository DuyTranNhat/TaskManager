import Joi from 'joi';

export const registerSchema = Joi.object({
    fullName: Joi.string().min(6).max(20).required().messages({
        'string.empty': 'Vui lòng nhập họ tên',
        'string.min': 'Họ tên tối thiểu 6 ký tự',
        'string.max': 'Họ tên tối đa 20 ký tự',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Vui lòng nhập email',
        'string.email': 'Sai định dạng email',
    }),
    password: Joi.string().min(6).max(20).required().messages({
        'string.empty': 'Vui lòng nhập mật khẩu',
        'string.min': 'Mật khẩu tối thiểu 6 ký tự',
        'string.max': 'Mật khẩu tối đa 20 ký tự',
    }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Vui lòng nhập email',
        'string.email': 'Sai định dạng email',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Vui lòng nhập mật khẩu',
    }),
});
