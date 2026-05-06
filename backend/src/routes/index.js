import { Router } from 'express';
import authRoutes from './auth.js';
import userRoutes from './userRoute.js';
import taskRoutes from './taskRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

export default router;
