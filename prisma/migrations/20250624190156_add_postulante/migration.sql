-- CreateTable
CREATE TABLE "Postulante" (
    "id" SERIAL NOT NULL,
    "vacanteId" INTEGER NOT NULL,
    "pasanteId" INTEGER NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "fechaPost" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Postulante_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Postulante" ADD CONSTRAINT "Postulante_vacanteId_fkey" FOREIGN KEY ("vacanteId") REFERENCES "Vacante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Postulante" ADD CONSTRAINT "Postulante_pasanteId_fkey" FOREIGN KEY ("pasanteId") REFERENCES "Pasante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
