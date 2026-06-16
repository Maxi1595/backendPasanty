const {PrismaSingleton} = require('../prisma/prisma.client');
const NotFound = require('../handler/error.notfound');

const traerPostulantes = async () => {
    const postulaciones = await PrismaSingleton.postulante.findMany();

    if (postulaciones === null || !postulaciones) {
        throw new NotFound("postulaciones no encontradas");
    }

    return (postulaciones);
}

const traerPostulacionPorId = async (id) => {
    const postulacion = await PrismaSingleton.postulante.findUnique({
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

    if (postulacion === null || !postulacion) {
        throw new NotFound("postulacion no encontradas");
    }

    return (postulacion);
}

const traerPostulacionPorVacante = async (empresa) => {
    const postulaciones = await PrismaSingleton.postulante.findMany({
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

    if(postulaciones === null || !postulaciones){
        throw new NotFound("postulaciones no encontradas");
    }

    return postulaciones;
}

const traerPostulacionPorPasante = async (id) => {
    const postulacion = await PrismaSingleton.postulante.findMany({
        where: { id: Number(id) }
    })

    if(!postulacion || postulacion === null) {
        throw new NotFound("postulacion no encontrada");
    }

    return postulacion;
}

const traerPorEstado = async (pasante) => {
    const postulacion = await PrismaSingleton.postulante.findMany({
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

    if (postulacion === null || !postulacion) {
        throw new NotFound("postulacion no encontradas");
    }

    return postulacion;
}

const postPostulacion = async (pasante, vacante) => {
    const postulacion = await PrismaSingleton.postulante.create({
        data: {
            pasanteId: Number(pasante),
            vacanteId: Number(vacante)
        }
    })
    return postulacion;
}

const borrarPostulacion = async (id) => {
    const postulacion = await PrismaSingleton.postulacion.create({
        where: { id: Number(id) }
    })
}

const cambiarEstado = async (id, estado) => {
    const postulacion = await PrismaSingleton.postulante.update({
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