import type { Request, Response } from "express";
import { registerSchema } from "./auth.schemas.js";
import { register } from "./auth.service.js";

export async function registerController(
  req: Request,
  res: Response
): Promise<void> {
  const resultado = registerSchema.safeParse(req.body);

  if (!resultado.success) {
    res.status(400).json({
      message: "Dados inválidos",
      errors: resultado.error.flatten(),
    });
    return;
  }

  try {
    const usuario = await register(resultado.data);

    res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      usuario,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_JA_CADASTRADO") {
      res.status(409).json({
        message: "E-mail já cadastrado",
      });
      return;
    }

    console.error(error);

    res.status(500).json({
      message: "Erro interno ao cadastrar usuário",
    });
  }
}