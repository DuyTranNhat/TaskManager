import { Router } from 'express';
import authRoutes from './auth.js';
import userRoutes from './userRoute.js';
import taskRoutes from './taskRoute.js';

const router = Router();

router.use('/tasks', taskRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
