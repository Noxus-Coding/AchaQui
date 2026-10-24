import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { criarPerfilProfissionalController } from "./profissionais.controller.js";
import { buscarMeuPerfilProfissionalController } from "./profissionais.controller.js";

export const profissionaisRoutes = Router();

profissionaisRoutes.post(
  "/",
  authMiddleware,
  criarPerfilProfissionalController
);

profissionaisRoutes.get(
  "/me",
  authMiddleware,
  buscarMeuPerfilProfissionalController
);