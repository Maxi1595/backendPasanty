/*
  Warnings:

  - You are about to drop the column `contraseña` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `correo` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `rol` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `correo` on the `Pasante` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Pasante` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuarioId]` on the table `Pasante` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Pasante` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Empresa_correo_key";

-- DropIndex
DROP INDEX "Pasante_correo_key";

-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "contraseña",
DROP COLUMN "correo",
DROP COLUMN "nombre",
DROP COLUMN "rol",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pasante" DROP COLUMN "correo",
DROP COLUMN "nombre",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "rol" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_usuarioId_key" ON "Admin"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_usuarioId_key" ON "Empresa"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Pasante_usuarioId_key" ON "Pasante"("usuarioId");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pasante" ADD CONSTRAINT "Pasante_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
