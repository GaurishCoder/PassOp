import { validationResult } from "express-validator";
import Password from "../models/password.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg;
      return res.status(400).json({ error: firstError });
    }
    const { username, email, password } = req.body;
    console.log("✅ Signup route hit");

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(406).json({ message: "Username already exists!" });
    }

    const user = new User({ username, email });

    user.password = await bcrypt.hash(password, 10);

    const userData = await user.save();

    let userPayload = {
      id: userData._id,
      username: userData.username,
    };
    let token = jwt.sign(userPayload, process.env.JWT_KEY, {
      expiresIn: "24h",
    });
    res.cookie("token", token);
    return res.status(201).json({ message: "User registered", user: userData });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Database Error", error });
  }
};

const login = async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid Username or Password" });
    }
    let isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Username or Password" });
    }
    let userPayload = {
      id: user._id,
      username: user.username,
    };
    let token = user.generateToken(userPayload);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax", // "Strict" or "None" if using cross-site cookies
      secure: false, // true in production (HTTPS)
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      userData: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(401).json(error);
  }
};

const verify = async (req, res) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userData = await User.findById(decoded.id);
    const passwordData = await Password.find({ userId: userData._id });
    req.user = userData;
    res.status(200).json({ user: userData, password: passwordData });
  } catch (error) {
    res.status(401);
    console.log(`${error}`);
  }
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(200).json({ message: "Logout Successfully" });
};

export default {
  signup,
  login,
  verify,
  logout,
};
