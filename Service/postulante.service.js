const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const traerPostulantes = async () => {
    const postulaciones = await prisma.postulante.findMany();

    return (postulaciones);
}

const traerPostulacionPorId = async (id) => {
    const postulacion = await prisma.postulante.findUnique({
        where: { id: id },
        include: {
            pasante: {
                include: {
                    usuario: {
                        select: {
                            nombre: true,
                            correo: true
                        }
                    }
                }
            },
            vacante: {
                select: {
                    estado: true,
                    empresaId: true
                }
            }
        }
    })

    return (postulacion);
}

const traerPostulacionPorVacante = async (empresa) => {
    const postulaciones = await prisma.postulante.findMany({
        where: {
            vacante: {
                empresaId: empresa.id
            },
            estado: "pendiente"
        },
        include: {
            pasante: {
                include: {
                    usuario: {
                        select: {
                            nombre: true,
                            correo: true
                        }
                    }
                }
            },
            vacante: {
                select: {
                    titulo: true
                }
            }
        }
    })

    return postulaciones;
}

const traerPostulacionPorPasante = async (id) => {
    const postulacion = await prisma.postulante.findMany({
        where: { id: Number(id) }
    })

    return postulacion;
}

module.exports = {
    traerPostulantes,
    traerPostulacionPorId,
    traerPostulacionPorVacante,
    traerPostulacionPorPasante,
}