import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

// ✅ Define methods BEFORE compiling model
userSchema.methods.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = function (password, hashPassword) {
  return bcrypt.compare(password, hashPassword);
};

userSchema.methods.generateToken = function (userPayload) {
  return jwt.sign(userPayload, process.env.JWT_KEY);
};

// ✅ Now create the model
export const User = mongoose.models.User || mongoose.model("User", userSchema);
