const NotFound = require("../handler/error.notfound");
const {PrismaSingleton} = require ("../prisma/prisma.client");

const TraerPerfilPasante = async (id) => {
    const perfil = await PrismaSingleton.perfilPasante.findUnique({
        where: {pasanteId: Number (id)}
    })

    if (!perfil || perfil === null){
        throw new NotFound ("perfil no encontrado");
    }

    return perfil
}

const ActualizarDescripcionPasante = async (id, data) => {
    const perfil = await PrismaSingleton.perfilPasante.update({
        where: {pasanteId : Number(id)},
        data: {descripcion : data}
    })

    return perfil
} 

module.exports = {
    TraerPerfilPasante,
    ActualizarDescripcionPasante,
}