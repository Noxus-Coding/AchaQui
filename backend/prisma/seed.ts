import { prisma } from "../src/lib/prisma.js";

const categorias = [
  "Eletricista",
  "Encanador",
  "Pedreiro",
  "Diarista",
  "Manicure",
  "Pintor",
  "Técnico em informática",
  "Montador de móveis",
];

async function main() {
  for (const nome of categorias) {
    await prisma.categoria.upsert({
      where: { nome },
      update: {},
      create: { nome },
    });
  }

  console.log("Categorias cadastradas com sucesso!");
}

main()
  .catch((error) => {
    console.error("Erro ao cadastrar categorias:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });