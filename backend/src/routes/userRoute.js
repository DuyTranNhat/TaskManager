import express from "express";
import { getCurrentUser, updatePassword, updateProfile } from "../controllers/userController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

//PRIVATE LINKS
userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.put("/profile", authMiddleware, updateProfile);
userRouter.put("/password", authMiddleware, updatePassword);

export default userRouter;