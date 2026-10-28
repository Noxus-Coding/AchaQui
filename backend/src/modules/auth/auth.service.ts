
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import { prisma } from "../../lib/prisma.js";
import type { RegisterDTO, LoginDTO } from "./auth.schemas.js";

const ACCESS_TOKEN_EXPIRATION = 900;

export function gerarAccessToken(usuarioId: string): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET_NAO_CONFIGURADO");
  }

  return jwt.sign(
    { sub: usuarioId },
    secret,
    {
      expiresIn: "15m",
      algorithm: "HS256",
      issuer: "achaqui-api",
      audience: "achaqui-web",
    }
  );
}

export async function register(data: RegisterDTO) {
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email: data.email },
  });

  if (usuarioExistente) {
    throw new Error("EMAIL_JA_CADASTRADO");
  }

  const senhaHash = await argon2.hash(data.senha);

  const usuario = await prisma.usuario.create({
    data: {
      nome: data.nome,
      email: data.email,
      senhaHash,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      criadoEm: true,
    },
  });

  return usuario;
}

export async function login(data: LoginDTO) {
  const usuario = await prisma.usuario.findUnique({
    where: { email: data.email },
  });

  if (!usuario) {
    throw new Error("CREDENCIAIS_INVALIDAS");
  }

  const senhaValida = await argon2.verify(
    usuario.senhaHash,
    data.senha
  );

  if (!senhaValida) {
    throw new Error("CREDENCIAIS_INVALIDAS");
  }

  const accessToken = gerarAccessToken(usuario.id);

  return {
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
    accessToken,
    tokenType: "Bearer",
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  };
}
