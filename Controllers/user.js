import User from "../models/userData.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../Utility/feature.js";
import ErrorHandler from "../middlewares/error.js";

// Register User
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User Already Exits", 404));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userId = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    sendCookie(userId, res, "Register Successfully...", 201);
  } catch (error) {
    next(error);
  }
};

// Login User
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Email or Password", 404));
    }

    sendCookie(user, res, `Welcome back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

// Logout User
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout...",
      // user: req.user,
    });
};

// Get My Profile
export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
