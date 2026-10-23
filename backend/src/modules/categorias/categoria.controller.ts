import type { Request, Response } from "express";
import { listarCategorias } from "./categorias.service.js";

export async function listarCategoriasController(
  _req: Request,
  res: Response
) {
  const categorias = await listarCategorias();

  return res.status(200).json(categorias);
}