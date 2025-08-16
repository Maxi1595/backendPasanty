-- CreateTable
CREATE TABLE "Pasante" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "especialidad" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'disponible',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pasante_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pasante_correo_key" ON "Pasante"("correo");
