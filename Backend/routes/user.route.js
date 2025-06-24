import express from "express";
const router = express.Router();
import UserController from "../controllers/user.controller.js";

router.get("/verify", UserController.verify);
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

export default router;
