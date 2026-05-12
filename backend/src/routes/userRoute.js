import express from "express";
import { getCurrentUser, updatePassword, updateProfile } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import { editProfileSchema, changePasswordSchema } from '../validations/user.js';

const userRouter = express.Router();

//PRIVATE LINKS
userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.put("/editProfile", authMiddleware, validateMiddleware(editProfileSchema), updateProfile);
userRouter.put("/changePassword", authMiddleware, validateMiddleware(changePasswordSchema), updatePassword);

export default userRouter;