const {PrismaSingleton} = require('../prisma/prisma.client');
const NotFound = require('../handler/error.notfound');

const traerVacantes = async () => {
    const vacantes = await PrismaSingleton.vacante.findMany()
    
    if (vacantes === null || !vacantes) {
        throw new NotFound("postulacion no encontradas");
    }

    return vacantes;
}

const traerVacantePorId = async (id) => {
    const vacante = await PrismaSingleton.vacante.findUnique({
        where: { id: Number(id) },
    })

    if (vacante === null || !vacante) {
        throw new NotFound("postulacion no encontradas");
    }

    return vacante;
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
    cerrarVacante,
}