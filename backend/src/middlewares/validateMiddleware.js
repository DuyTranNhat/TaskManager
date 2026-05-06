const validateMiddleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            //My comment - có thể import statusCode từ http-status-codes để dùng cho dễ đọc
            return res.status(400).json({
                message: 'Dữ liệu không hợp lệ',
                errors: error.details.map((err) => ({
                    field: err.path[0],
                    message: err.message,
                })),
            });
        }
        next();
    };
};
export default validateMiddleware;
