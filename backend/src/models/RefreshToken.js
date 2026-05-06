import mongoose from 'mongoose';
import { REFRESH_EXPIRE_DAYS } from '../constants/index.js';

const RefreshTokenSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        token: { type: String, required: true },
        // Thời điểm token hết hạn (TTL Index)
        expiresAt: {
            type: Date,
            required: true,
            index: { expires: 0 },
            default: () => new Date(Date.now() + REFRESH_EXPIRE_DAYS * 24 * 60 * 60 * 1000),
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('RefreshToken', RefreshTokenSchema);
