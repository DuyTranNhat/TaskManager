import Joi from 'joi';

const Status = ['Todo', 'InProgress', 'Completed'];
const Priority = ['Low', 'Normal', 'High'];

export const taskSchema = Joi.object({
    title: Joi.string().min(6).max(200).required().messages({
        'string.empty': 'Vui lòng nhập tiêu đề',
        'string.min': 'Tối thiểu 6 ký tự!',
        'string.max': 'Tối đa 200 ký tự',
    }),
    description: Joi.string().min(6).max(600).required().messages({
        'string.empty': 'Vui lòng nhập mô tả',
        'string.min': 'Tối thiểu 6 ký tự!',
        'string.max': 'Tối đa 600 ký tự',
    }),
    status: Joi.string()
        .valid(...Status)
        .required()
        .messages({
            'any.only': 'Trạng thái không hợp lệ',
            'string.empty': 'Vui lòng chọn trạng thái',
        }),
    priority: Joi.string()
        .valid(...Priority)
        .required()
        .messages({
            'any.only': 'Độ ưu tiên không hợp lệ',
            'string.empty': 'Vui lòng chọn độ ưu tiên',
        }),
    dueDate: Joi.date().required().messages({
        'date.base': 'Ngày không hợp lệ',
        'any.required': 'Vui lòng chọn hạn chót',
    }),
});
