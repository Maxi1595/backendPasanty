/*
  Warnings:

  - You are about to drop the column `seccion1Contenido` on the `PerfilPasante` table. All the data in the column will be lost.
  - You are about to drop the column `seccion1Titulo` on the `PerfilPasante` table. All the data in the column will be lost.
  - You are about to drop the column `seccion2Contenido` on the `PerfilPasante` table. All the data in the column will be lost.
  - You are about to drop the column `seccion2Titulo` on the `PerfilPasante` table. All the data in the column will be lost.
  - You are about to drop the column `seccion3Contenido` on the `PerfilPasante` table. All the data in the column will be lost.
  - You are about to drop the column `seccion3Titulo` on the `PerfilPasante` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PerfilPasante" DROP COLUMN "seccion1Contenido",
DROP COLUMN "seccion1Titulo",
DROP COLUMN "seccion2Contenido",
DROP COLUMN "seccion2Titulo",
DROP COLUMN "seccion3Contenido",
DROP COLUMN "seccion3Titulo",
ADD COLUMN     "formacion" TEXT,
ADD COLUMN     "proyectos" TEXT;
