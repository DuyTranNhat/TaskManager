import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import RefreshToken from '../models/RefreshToken.js';
import { ACCESS_EXPIRE_MINUTES, REFRESH_EXPIRE_DAYS } from '../constants/index.js';

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: `${ACCESS_EXPIRE_MINUTES}m` },
    );
};

export const generateRefreshToken = async (userId) => {
    const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: `${REFRESH_EXPIRE_DAYS}d`,
    });

    const newToken = new RefreshToken({
        userId,
        token: refreshToken,
    });

    await newToken.save();

    return refreshToken;
};
