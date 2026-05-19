import bcrypt from "bcrypt";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/UserModel.js";
import RefreshToken from "../models/RefreshToken.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { REFRESH_EXPIRE_DAYS } from "../constants/index.js";

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return next({
        statusCode: 400,
        message: "Vui lòng điền đầy đủ thông tin",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return next({ statusCode: 400, message: "Email đã tồn tại" });
    }

    const user = await User.create({
      fullName,
      email,
      passwordHash: password,
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // localhost nên false, production mới true
      sameSite: "Lax", // cross-site cookie
      path: "/", // bắt đầu từ root
    });

    res.status(201).json({
      user: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const loginGoogle = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const accessToken = generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user._id);

      const { passwordHash, ...rest } = user._doc;
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          path: "/",
          maxAge: 1000 * 60 * 60 * 24 * REFRESH_EXPIRE_DAYS,
        })
        .status(200)
        .json({
          user: {
            userId: rest._id,
            fullName: rest.fullName,
            email: rest.email,
          },
          accessToken,
        });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const newUser = new User({
        fullName:
          req.body.fullName.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        passwordHash: generatedPassword,
      });

      await newUser.save();

      const accessToken = generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user._id);
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          path: "/",
          maxAge: 1000 * 60 * 60 * 24 * REFRESH_EXPIRE_DAYS,
        })
        .status(200)
        .json({
          user: {
            userId: newUser._id,
            fullName: rest.fullName,
            email: rest.email,
          },
          accessToken,
        });
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return next({ statusCode: 400, message: "Sai email hoặc mật khẩu" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return next({ statusCode: 400, message: "Sai email hoặc mật khẩu" });

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * REFRESH_EXPIRE_DAYS,
    });

    res.json({
      user: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken)
      return res.status(403).json({
        code: "REFRESH_EXPIRED",
        message: "Refresh token hết hạn hoặc không hợp lệ",
      });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, payload) => {
        if (err) {
          await RefreshToken.findOneAndDelete({ token: refreshToken });
          return res.status(403).json({
            code: "REFRESH_EXPIRED",
            message: "Refresh token hết hạn hoặc không hợp lệ",
          });
        }

        const user = await User.findById(payload.id);
        if (!user) {
          await RefreshToken.findOneAndDelete({ token: refreshToken });
          return res.status(403).json({
            code: "REFRESH_EXPIRED",
            message: "Refresh token hết hạn hoặc không hợp lệ",
          });
        }

        const accessToken = generateAccessToken(user);

        return res.json({ accessToken });
      },
    );
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    await RefreshToken.findOneAndDelete({ token: refreshToken });
    res.clearCookie("refreshToken");
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
