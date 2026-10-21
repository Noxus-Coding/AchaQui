import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { meController } from "./auth.controller.js";
import {
  registerController,
  loginController,
} from "./auth.controller.js";

export const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.get("/me", authMiddleware, meController);