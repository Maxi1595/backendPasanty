/*
  Warnings:

  - A unique constraint covering the columns `[vacanteId,pasanteId]` on the table `Postulante` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Postulante_vacanteId_pasanteId_key" ON "Postulante"("vacanteId", "pasanteId");
