-- CreateTable
CREATE TABLE "PerfilPasante" (
    "id" SERIAL NOT NULL,
    "pasanteId" INTEGER NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "PerfilPasante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerfilEmpresa" (
    "id" SERIAL NOT NULL,
    "empresaId" INTEGER NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "PerfilEmpresa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PerfilPasante_pasanteId_key" ON "PerfilPasante"("pasanteId");

-- CreateIndex
CREATE UNIQUE INDEX "PerfilEmpresa_empresaId_key" ON "PerfilEmpresa"("empresaId");

-- AddForeignKey
ALTER TABLE "PerfilPasante" ADD CONSTRAINT "PerfilPasante_pasanteId_fkey" FOREIGN KEY ("pasanteId") REFERENCES "Pasante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfilEmpresa" ADD CONSTRAINT "PerfilEmpresa_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
