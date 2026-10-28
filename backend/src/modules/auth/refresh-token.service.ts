import { createHash, randomBytes } from "node:crypto";

import { prisma } from "../../lib/prisma.js";

const REFRESH_TOKEN_DIAS = 7;

function gerarHash(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function criarRefreshToken(usuarioId: string) {
  const token = randomBytes(32).toString("hex");

  const expiraEm = new Date(
    Date.now() + REFRESH_TOKEN_DIAS * 24 * 60 * 60 * 1000
  );

  await prisma.refreshToken.create({
    data: {
      usuarioId,
      tokenHash: gerarHash(token),
      expiraEm,
    },
  });

  return {
    token,
    expiraEm,
  };
}


export async function renovarRefreshToken(token: string) {
  const tokenHash = gerarHash(token);

  return prisma.$transaction(async (tx) => {
    const agora = new Date();

    const atualizado = await tx.refreshToken.updateMany({
      where: {
        tokenHash,
        revogadoEm: null,
        expiraEm: { gt: agora },
      },
      data: {
        revogadoEm: agora,
      },
    });

    if (atualizado.count !== 1) {
      throw new Error("REFRESH_TOKEN_INVALIDO");
    }

    const tokenAnterior = await tx.refreshToken.findUnique({
      where: { tokenHash },
      select: { usuarioId: true },
    });

    if (!tokenAnterior) {
      throw new Error("REFRESH_TOKEN_INVALIDO");
    }

    const novoToken = randomBytes(32).toString("hex");

    const expiraEm = new Date(
      Date.now() + REFRESH_TOKEN_DIAS * 24 * 60 * 60 * 1000
    );

    const usuario = await tx.usuario.findUnique({
      where: { id: tokenAnterior.usuarioId },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });

    if (!usuario) {
      throw new Error("REFRESH_TOKEN_INVALIDO");
    }

    await tx.refreshToken.create({
      data: {
        usuarioId: usuario.id,
        tokenHash: gerarHash(novoToken),
        expiraEm,
      },
    });

    return {
      usuario,
      refreshToken: novoToken,
    };
  });
}

export async function revogarRefreshToken(token: string): Promise<void> {
  const tokenHash = gerarHash(token);

  await prisma.refreshToken.updateMany({
    where: {
      tokenHash,
      revogadoEm: null,
    },
    data: {
      revogadoEm: new Date(),
    },
  });
}

