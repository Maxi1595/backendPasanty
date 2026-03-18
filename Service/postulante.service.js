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

const traerPorEstado = async (pasante) => {
    const postulacion = await prisma.postulante.findMany({
        where: { pasanteId: pasante.id },
        include: {
            vacante: {
                select: {
                    titulo: true,
                    descripcion: true
                }
            }
        }
    })

    return postulacion;
}

const postPostulacion = async (pasante, vacante) => {
    const postulacion = await prisma.postulante.create({
        data: {
            pasanteId: Number(pasante),
            vacanteId: Number(vacante)
        }
    })
    return postulacion;
}

const borrarPostulacion = async (id) => {
    const postulacion = await prisma.postulacion.create({
        where: { id: Number(id) }
    })
}

const cambiarEstado = async (id, estado) => {
    const postulacion = await prisma.postulante.update({
        where: { id: Number(id) },
        data: { estado: estado }
    })
    
    return postulacion;
}

module.exports = {
    traerPostulantes,
    traerPostulacionPorId,
    traerPostulacionPorVacante,
    traerPostulacionPorPasante,
    traerPorEstado,
    postPostulacion,
    borrarPostulacion,
    cambiarEstado,
}