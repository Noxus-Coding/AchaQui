
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validarOrigem } from "./origin.middleware.js";

import {
  registerController,
  loginController,
  refreshController,
  meController,
  logoutController,
} from "./auth.controller.js";

export const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.post("/refresh", validarOrigem, refreshController);
authRoutes.post("/logout", validarOrigem, logoutController);
authRoutes.get("/me", authMiddleware, meController);
