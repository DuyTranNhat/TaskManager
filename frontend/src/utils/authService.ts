/* eslint-disable @typescript-eslint/no-explicit-any */
let refreshTokenFn: ((httpRequest: any, originalRequest: any, handleError: any) => Promise<any>) | null = null;

export const registerRefreshHandler = (fn: typeof refreshTokenFn) => {
    refreshTokenFn = fn;
};

export const callRefreshHandler = (httpRequest: any, originalRequest: any, handleError: any) => {
    if (!refreshTokenFn) throw new Error('Refresh handler chưa được đăng ký');
    return refreshTokenFn(httpRequest, originalRequest, handleError);
};
