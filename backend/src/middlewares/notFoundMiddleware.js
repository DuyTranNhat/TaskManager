const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        message: `Không tìm thấy route: ${req.originalUrl}`,
    });
};

export default notFoundMiddleware;
