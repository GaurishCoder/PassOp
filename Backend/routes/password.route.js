import express from "express";
const router = express.Router();
import PasswordController from "../controllers/password.controller.js";
import { fileURLToPath } from "url";
import path from "path";
import { authMiddleware } from "../middleware/jwtAuth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
router.use(express.static(path.join(__dirname, "..", "Fronted")));

router.get("/", PasswordController.renderHome);

router.post("/password", authMiddleware, PasswordController.createPassword);

router.get("/password/edit", PasswordController.renderEdit);

router.put("/password/edit/:id", PasswordController.edit);

router.delete("/password/delete/:id", PasswordController.deleteData);

export default router;
