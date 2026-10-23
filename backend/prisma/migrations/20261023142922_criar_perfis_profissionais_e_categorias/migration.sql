-- CreateTable
CREATE TABLE "perfis_profissionais" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "nomeProfissional" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "fotoUrl" TEXT,
    "experiencia" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perfis_profissionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriaToPerfilProfissional" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoriaToPerfilProfissional_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "perfis_profissionais_usuarioId_key" ON "perfis_profissionais"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "categorias"("nome");

-- CreateIndex
CREATE INDEX "_CategoriaToPerfilProfissional_B_index" ON "_CategoriaToPerfilProfissional"("B");

-- AddForeignKey
ALTER TABLE "perfis_profissionais" ADD CONSTRAINT "perfis_profissionais_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToPerfilProfissional" ADD CONSTRAINT "_CategoriaToPerfilProfissional_A_fkey" FOREIGN KEY ("A") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToPerfilProfissional" ADD CONSTRAINT "_CategoriaToPerfilProfissional_B_fkey" FOREIGN KEY ("B") REFERENCES "perfis_profissionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;
