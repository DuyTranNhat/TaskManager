const errorHandler = (err, req, res, next) => {
    console.error('Error: ', err);

    // Controller error
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            message: err.message || 'Có lỗi xảy ra',
        });
    }

    // Server error
    return res.status(500).json({
        message: 'Lỗi server. Vui lòng thử lại sau',
    });
};

export default errorHandler;
