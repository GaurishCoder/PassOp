import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // make sure `.js` is included if using ES Modules

export const authMiddleware = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "You must be LoggedIn" });
  console.log(req.cookies.token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
