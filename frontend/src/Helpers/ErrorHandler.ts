/* eslint-disable no-case-declarations */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { toast } from 'react-toastify';

export const handleError = (err: any) => {
    if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        let message = err.response?.data?.message || 'Lỗi không xác định';
        switch (status) {
            case 400: {
                // Joi validation errors (array)
                const validationErrors = err.response?.data?.errors;
                if (Array.isArray(validationErrors)) {
                    validationErrors.forEach((e: any) => {
                        toast.warning(e.message);
                    });
                } else {
                    toast.error(`Yêu cầu không hợp lệ: ${message}`);
                }
                break;
            }
            case 401:
                toast.warn('Phiên đăng nhập của bạn đã hết. Vui lòng đăng nhập lại!');
                break;
            case 403:
                const errorCode = err.response?.data?.code;
                if (errorCode === 'REFRESH_EXPIRED' || errorCode === 'REFRESH_INVALID') {
                    toast.warn('Phiên đăng nhập của bạn đã hết. Vui lòng đăng nhập lại!');
                } else if (errorCode === 'NO_PERMISSION') {
                    toast.warn('Bạn không có quyền truy cập chức năng này');
                } else {
                    toast.error(message || 'Lỗi 403 không xác định');
                }
                break;
            case 404:
                toast.error(message || 'Không tìm thấy tài nguyên');
                break;
            case 500:
                toast.error(message || 'Lỗi server. Vui lòng thử lại sau');
                break;
            default:
                toast.error(message);
        }
    }
};
