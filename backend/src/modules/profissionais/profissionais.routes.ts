import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { criarPerfilProfissionalController } from "./profissionais.controller.js";
import { buscarMeuPerfilProfissionalController } from "./profissionais.controller.js";
import { atualizarPerfilProfissionalController } from "./profissionais.controller.js";
import { listarProfissionaisController } from "./profissionais.controller.js";
import { buscarProfissionalPorIdController } from "./profissionais.controller.js";

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

profissionaisRoutes.patch(
  "/me",
  authMiddleware,
  atualizarPerfilProfissionalController
);

profissionaisRoutes.get("/", listarProfissionaisController);
profissionaisRoutes.get("/:id", buscarProfissionalPorIdController);