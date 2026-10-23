import { prisma } from "../../lib/prisma.js";

export async function listarCategorias() {
  return prisma.categoria.findMany({
    orderBy: {
      nome: "asc",
    },
  });
}