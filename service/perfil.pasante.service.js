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

const ActualizarPerfilPasante = async (id, data) => {
    const perfil = await PrismaSingleton.perfilPasante.update({
        where: {pasanteId : Number(id)},
        data: data
    })

    return perfil
} 

const CrearPerfilPasante = async (id) => {
    const perfil = await PrismaSingleton.perfilPasante.create({
        data: { pasanteId: id}
    })
    
    return perfil
}

module.exports = {
    TraerPerfilPasante,
    ActualizarPerfilPasante,
    CrearPerfilPasante,
}