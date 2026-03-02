const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const traerPasantes = async () => {
    const pasantes = await prisma.pasante.findMany({
        include: {
            usuario: {
                select: {
                    nombre: true
                }
            }
        }
    })
    return pasantes;
}

const trearPasantePorId = async (id) => {
    const pasante = await prisma.pasante.findUnique({
        where: { id: Number(id) },
        include: {
            usuario: {
                select: {
                    nombre: true,
                    correo: true
                }
            }
        }
    });
    return pasante;
}

const cambiarPasante = async (id, data) => {
    const actualizacion = await prisma.pasante.update({
        where: { id: Number(id) },
        data: data
    });
    return actualizacion;
}

const borrarPasante = async (id) => {
    const pasante = await prisma.pasante.delete({
        where: { id: Number(id) }
    })
}

module.exports = {
    traerPasantes,
    trearPasantePorId,
    cambiarPasante,
    borrarPasante
}