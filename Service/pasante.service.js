const {PrismaSingleton} = require('../prisma/prisma.client');
const NotFound = require('../handler/error.notfound');

const traerPasantes = async () => {
    const pasantes = await PrismaSingleton.pasante.findMany({
        include: {
            usuario: {
                select: {
                    nombre: true
                }
            }
        }
    })

    if (pasantes === null || !pasantes) {
        throw new NotFound("postulaciones no encontradas");
    }

    return pasantes;
}

const trearPasantePorId = async (id) => {
    const pasante = await PrismaSingleton.pasante.findUnique({
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

    if(pasante === null || !pasante){
        throw new NotFound("postulacion no encontrada");
    }

    return pasante;
}

const cambiarPasante = async (id, data) => {
    const actualizacion = await PrismaSingleton.pasante.update({
        where: { id: Number(id) },
        data: data
    }); 
    return actualizacion;
}

const crearPasante = async (especialidad, id) => {
    const pasante = await PrismaSingleton.pasante.create({
        data: {
            especialidad: especialidad,
            usuarioId: id
        }
    })

    return pasante;
}

const borrarPasante = async (id) => {
    const pasante = await PrismaSingleton.pasante.delete({
        where: { id: Number(id) }
    })

    return pasante;
}

module.exports = {
    traerPasantes,
    trearPasantePorId,
    cambiarPasante,
    crearPasante,
    borrarPasante,
}