import { prisma } from "./lib/prisma.js";

async function main() {
  const totalUsuarios = await prisma.usuario.count();

  console.log("Conexão com PostgreSQL realizada!");
  console.log("Total de usuários:", totalUsuarios);
}

main()
  .catch((error) => {
    console.error("Erro ao conectar ao banco:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });