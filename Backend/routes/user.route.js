import express from "express";
const router = express.Router();
import UserController from "../controllers/user.controller.js";
import { body } from "express-validator";

router.get("/verify", UserController.verify);
router.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  UserController.signup
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

export default router;
