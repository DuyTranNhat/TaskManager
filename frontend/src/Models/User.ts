export interface User {
    userId: string;
    fullName: string;
    email: string;
}

export interface UserProfile {
    userId: string;
    fullName: string;
    email: string;
}

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    user: User;
    accessToken: string;
};

export type RegisterRequest = {
    fullName: string;
    email: string;
    password: string;
};

export type RegisterResponse = {
    user: User;
    accessToken: string;
};

export type EditProfileRequest = {
    fullName: string;
    email: string;
};

export type ChangePasswordRequest = {
    oldPassword: string;
    newPassword: string;
};
