import express from "express";
import { getCurrentUser, updatePassword, updateProfile, register, login } from "../controllers/UserController.js";


import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();   

//PUBLIC LINKS

userRouter.post("/register", register);
userRouter.post("/login", login);

//PRIVATE LINKS
userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.put("/profile", authMiddleware, updateProfile);
userRouter.put("/password", authMiddleware, updatePassword);

export default userRouter;