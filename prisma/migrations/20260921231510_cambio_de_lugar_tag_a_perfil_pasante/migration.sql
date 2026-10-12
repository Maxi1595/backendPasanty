/*
  Warnings:

  - You are about to drop the column `tags` on the `Pasante` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pasante" DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "PerfilPasante" ADD COLUMN     "tags" TEXT;
