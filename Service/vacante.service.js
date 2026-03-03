const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;

const traerVacantes = async () => {
    const vacantes = await prisma.vacante.findMany()

    return vacantes;
}

const traerVacantePorId = async (id) => {
    const vacante = await prisma.vacante.findUnique({
        where: { id: Number(id) },
    })

    return vacante;
}

module.exports = {
    traerVacantes,
    traerVacantePorId,
}