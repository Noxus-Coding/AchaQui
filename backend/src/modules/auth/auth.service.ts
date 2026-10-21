import argon2 from "argon2";
import { prisma } from "../../lib/prisma.js";
import type { RegisterDTO } from "./auth.schemas.js";

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