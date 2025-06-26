import express from "express";
const router = express.Router();
import PasswordController from "../controllers/password.controller.js";
import { authMiddleware } from "../middleware/jwtAuth.js";


router.get("/", PasswordController.renderHome);

router.post("/password", PasswordController.createPassword);

router.get("/password/edit", PasswordController.renderEdit);

router.put("/password/edit/:id", PasswordController.edit);

router.delete("/password/delete/:id", PasswordController.deleteData);

export default router;
