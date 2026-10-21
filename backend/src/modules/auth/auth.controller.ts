import type { Request, Response } from "express";
import { registerSchema } from "./auth.schemas.js";
import { register } from "./auth.service.js";
import { loginSchema } from "./auth.schemas.js";
import { login } from "./auth.service.js";
import { prisma } from "../../lib/prisma.js";

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

export async function loginController(
  req: Request,
  res: Response
): Promise<void> {
  const resultado = loginSchema.safeParse(req.body);

  if (!resultado.success) {
    res.status(400).json({
      message: "Dados inválidos",
      errors: resultado.error.flatten(),
    });
    return;
  }

  try {
    const resposta = await login(resultado.data);

    res.status(200).json(resposta);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "CREDENCIAIS_INVALIDAS"
    ) {
      res.status(401).json({
        message: "E-mail ou senha inválidos",
      });
      return;
    }

    console.error(error);

    res.status(500).json({
      message: "Erro interno ao realizar login",
    });
  }
}


export async function meController(
  req: Request,
  res: Response
): Promise<void> {
  const usuario = await prisma.usuario.findUnique({
    where: { id: res.locals.usuarioId },
    select: {
      id: true,
      nome: true,
      email: true,
      criadoEm: true,
    },
  });

  if (!usuario) {
    res.status(401).json({ message: "Usuário não encontrado" });
    return;
  }

  res.status(200).json({ usuario });
}