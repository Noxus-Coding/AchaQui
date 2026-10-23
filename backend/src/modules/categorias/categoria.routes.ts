import { Router } from "express";
import { listarCategoriasController } from "./categoria.controller.js"

export const categoriasRoutes = Router();

categoriasRoutes.get("/", listarCategoriasController);