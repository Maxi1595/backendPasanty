const { PrismaSingleton } = require('../prisma/prisma.client');
const NotFound = require('../handler/error.notfound');

const traerVacantes = async () => {
    const vacantes = await PrismaSingleton.vacante.findMany()

    if (vacantes === null || !vacantes) {
        throw new NotFound("vacante no encontradas");
    }

    return vacantes;
}

const traerVacantePorId = async (id) => {
    const vacante = await PrismaSingleton.vacante.findUnique({
        where: { id: Number(id) },
        include: {
            empresa: {
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nombre: true
                        }
                    }
                }
            }
        }
    })

    if (vacante === null || !vacante) {
        throw new NotFound("vacante no encontradas");
    }

    return vacante;
}

const traerTodasVacantePorId = async (id) => {
    const vacantes = await PrismaSingleton.vacante.findMany({
        where: { empresaId: Number(id) },
    })

    if (vacantes === null || !vacantes) {
        throw new NotFound("vacantes no encontradas");
    }

    return vacantes;
}

const crearVacante = async (id, data) => {
    const vacante = await PrismaSingleton.vacante.create({
        data: {
            ...data,
            empresaId: id
        }
    })

    return vacante
}

const cerrarVacante = async (id) => {
    const vacante = await PrismaSingleton.vacante.update({
        where: { id: id },
        data: { estado: "cerrado" }
    })

    return vacante
}

module.exports = {
    traerVacantes,
    traerVacantePorId,
    traerTodasVacantePorId,
    crearVacante,
    cerrarVacante,
}