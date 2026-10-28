import type { Request, Response } from "express";
import { registerSchema } from "./auth.schemas.js";
import { register } from "./auth.service.js";
import { loginSchema } from "./auth.schemas.js";
import { login } from "./auth.service.js";
import { prisma } from "../../lib/prisma.js";
import { criarRefreshToken } from "./refresh-token.service.js";
import { gerarAccessToken } from "./auth.service.js";
import { renovarRefreshToken, revogarRefreshToken } from "./refresh-token.service.js";
import {
  REFRESH_TOKEN_COOKIE,
  definirCookieRefreshToken,
  removerCookieRefreshToken,
} from "./refresh-token.cookie.js";

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

    const { token: refreshToken } = await criarRefreshToken(
      resposta.usuario.id
    );

    definirCookieRefreshToken(res, refreshToken);

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


export async function refreshController(
  req: Request,
  res: Response
): Promise<void> {
  const token = req.cookies?.[REFRESH_TOKEN_COOKIE];

  if (typeof token !== "string" || !token) {
    res.status(401).json({
      message: "Sessão não encontrada",
    });
    return;
  }

  try {
    const resultado = await renovarRefreshToken(token);

    const accessToken = gerarAccessToken(resultado.usuario.id);

    definirCookieRefreshToken(res, resultado.refreshToken);

    res.status(200).json({
      usuario: resultado.usuario,
      accessToken,
      tokenType: "Bearer",
      expiresIn: 900,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "REFRESH_TOKEN_INVALIDO"
    ) {
      removerCookieRefreshToken(res);

      res.status(401).json({
        message: "Sessão inválida ou expirada",
      });
      return;
    }

    console.error(error);

    res.status(500).json({
      message: "Erro interno ao renovar a sessão",
    });
  }
}

export async function logoutController(
  req: Request,
  res: Response
): Promise<void> {
  const token = req.cookies?.[REFRESH_TOKEN_COOKIE];

  try {
    if (typeof token === "string" && token.length > 0) {
      await revogarRefreshToken(token);
    }

    removerCookieRefreshToken(res);

    res.status(200).json({
      message: "Logout realizado com sucesso",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erro interno ao realizar logout",
    });
  }
}
