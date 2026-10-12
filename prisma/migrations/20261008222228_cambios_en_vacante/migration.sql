/*
  Warnings:

  - Made the column `puesto` on table `Vacante` required. This step will fail if there are existing NULL values in that column.
  - Made the column `remuneracion` on table `Vacante` required. This step will fail if there are existing NULL values in that column.
  - Made the column `anioAcademico` on table `Vacante` required. This step will fail if there are existing NULL values in that column.
  - Made the column `direccion` on table `Vacante` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jornada` on table `Vacante` required. This step will fail if there are existing NULL values in that column.
  - Made the column `modalidad` on table `Vacante` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vacante" ALTER COLUMN "puesto" SET NOT NULL,
ALTER COLUMN "remuneracion" SET NOT NULL,
ALTER COLUMN "anioAcademico" SET NOT NULL,
ALTER COLUMN "direccion" SET NOT NULL,
ALTER COLUMN "jornada" SET NOT NULL,
ALTER COLUMN "modalidad" SET NOT NULL;
