import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";



export default async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // 2. Lấy token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // 3. Verify token
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // payload là: { id, email }  
    const user = await userModel.findById(payload.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;

    next();

  } catch (error) {
    console.error("Auth error:", error.message);

    // Phân biệt lỗi
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }

    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
