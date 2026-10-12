/*
  Warnings:

  - You are about to drop the column `historia` on the `PerfilEmpresa` table. All the data in the column will be lost.
  - You are about to drop the column `mision` on the `PerfilEmpresa` table. All the data in the column will be lost.
  - You are about to drop the column `vision` on the `PerfilEmpresa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PerfilEmpresa" DROP COLUMN "historia",
DROP COLUMN "mision",
DROP COLUMN "vision";
