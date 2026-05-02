import User from "../models/UserModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const TOKEN_EXPIRATION = "1h";

const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to create JWT token
const createToken = (user) =>
  jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });

// Register a new user
export async function register(req, res) {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng điền đầy đủ thông tin" });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Email không hợp lệ" });
  }

  try {
    if (await User.findOne({ email })) {
      return res
        .status(409)
        .json({ success: false, message: "User đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: fullName,
      email,
      password: hashedPassword,
    });

    const token = createToken(user);

    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
}

// Login user
export async function login(req, res) {
  const { email, password } = req.body; 

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng điền đầy đủ thông tin" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Email không tồn tại" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Email hoặc mật khẩu không đúng" });
    }

    const token = createToken(user);

    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      user : {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
}   

//Get current user
export async function getCurrentUser(req, res) {
  const userId = req.user.id;   

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User không tồn tại" });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);
    return res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
}

//update user profile
export async function updateProfile(req, res) {
  const userId = req.user.id; 
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng điền đầy đủ thông tin" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User không tồn tại" });
    }

    user = await User.findByIdAndUpdate(
      userId,
      { fullName, email },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Thông tin người dùng đã được cập nhật",
      user: {
        id: user._id, 
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
}


export async function updatePassword(req, res) { 
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng điền đầy đủ thông tin" });
  }

  if (newPassword.length < 6) { 
    return res
      .status(400)
      .json({ success: false, message: "Mật khẩu mới phải có ít nhất 6 ký tự" });
  } 

  try {
    const user = await User.findById(userId); 
    if (!user) {
      return res.status(404).json({ success: false, message: "User không tồn tại" });
    }
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Mật khẩu hiện tại không đúng" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.status(200).json({ success: true, message: "Mật khẩu đã được cập nhật" });
  } catch (error) {
    console.error("Update password error:", error);
    return res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
}