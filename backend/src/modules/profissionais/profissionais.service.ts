import { prisma } from "../../lib/prisma.js";
import type {
  CriarPerfilProfissionalInput,
  AtualizarPerfilProfissionalInput,
} from "./profissionais.schema.js";

export class PerfilProfissionalError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = "PerfilProfissionalError";
  }
}

export async function criarPerfilProfissional(
  usuarioId: string,
  dados: CriarPerfilProfissionalInput
) {
  
  const perfilExistente = await prisma.perfilProfissional.findUnique({
    where: { usuarioId },
  });

  if (perfilExistente) {
    throw new PerfilProfissionalError(
      "Este usuário já possui um perfil profissional.",
      409
    );
  }

  const categorias = await prisma.categoria.findMany({
    where: {
      id: {
        in: dados.categoriaIds,
      },
    },
    select: {
      id: true,
    },
  });

  if (categorias.length !== dados.categoriaIds.length) {
    throw new PerfilProfissionalError(
      "Uma ou mais categorias selecionadas não existem.",
      400
    );
  }

  const perfil = await prisma.perfilProfissional.create({
    data: {
      usuarioId,
      nomeProfissional: dados.nomeProfissional,
      descricao: dados.descricao,
      whatsapp: dados.whatsapp,
      bairro: dados.bairro,
      fotoUrl: dados.fotoUrl,
      experiencia: dados.experiencia,

      categorias: {
        connect: dados.categoriaIds.map((id) => ({ id })),
      },
    },
    include: {
      categorias: true,
    },
  });

  return perfil;
}

export async function buscarMeuPerfilProfissional(usuarioId: string) {
  return prisma.perfilProfissional.findUnique({
    where: { usuarioId },
    include: {
      categorias: true,
    },
  });
}

export async function atualizarPerfilProfissional(
  usuarioId: string,
  dados: AtualizarPerfilProfissionalInput
) {
  const perfilExistente = await prisma.perfilProfissional.findUnique({
    where: { usuarioId },
  });

  if (!perfilExistente) {
    throw new PerfilProfissionalError(
      "Perfil profissional não encontrado.",
      404
    );
  }

  if (dados.categoriaIds !== undefined) {
    const categorias = await prisma.categoria.findMany({
      where: {
        id: { in: dados.categoriaIds },
      },
      select: { id: true },
    });

    if (categorias.length !== dados.categoriaIds.length) {
      throw new PerfilProfissionalError(
        "Uma ou mais categorias selecionadas não existem.",
        400
      );
    }
  }

  const { categoriaIds, ...campos } = dados;

  return prisma.perfilProfissional.update({
    where: { usuarioId },
    data: {
      ...campos,
      ...(categoriaIds !== undefined && {
        categorias: {
          set: categoriaIds.map((id) => ({ id })),
        },
      }),
    },
    include: {
      categorias: true,
    },
  });
}

interface FiltrosProfissionais {
  busca?: string;
  categoriaId?: string;
  pagina?: number;
  limite?: number;
}

export async function listarProfissionais(
  filtros: FiltrosProfissionais = {}
) {
  const pagina = filtros.pagina ?? 1;
  const limite = filtros.limite ?? 10;
  const skip = (pagina - 1) * limite;

  const where = {
    ...(filtros.busca && {
      nomeProfissional: {
        contains: filtros.busca,
        mode: "insensitive" as const,
      },
    }),

    ...(filtros.categoriaId && {
      categorias: {
        some: {
          id: filtros.categoriaId,
        },
      },
    }),
  };

  const [profissionais, total] = await prisma.$transaction([
    prisma.perfilProfissional.findMany({
      where,
      skip,
      take: limite,
      select: {
        id: true,
        nomeProfissional: true,
        descricao: true,
        whatsapp: true,
        bairro: true,
        fotoUrl: true,
        experiencia: true,
        categorias: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
      orderBy: {
        criadoEm: "desc",
      },
    }),

    prisma.perfilProfissional.count({ where }),
  ]);

  return {
    profissionais,
    paginacao: {
      pagina,
      limite,
      total,
      totalPaginas: Math.ceil(total / limite),
    },
  };
}

export async function buscarProfissionalPorId(id: string) {
  return prisma.perfilProfissional.findUnique({
    where: { id },
    select: {
      id: true,
      nomeProfissional: true,
      descricao: true,
      whatsapp: true,
      bairro: true,
      fotoUrl: true,
      experiencia: true,
      categorias: {
        select: {
          id: true,
          nome: true,
        },
      },
    },
  });
}