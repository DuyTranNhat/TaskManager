import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function authMiddleware(req, res, next) { 
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    //verify token
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(payload.userId).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({ success: false, message: "Token invalid or expired" });
    }
 }

