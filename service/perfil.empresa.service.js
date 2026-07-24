const NotFound = require("../handler/error.notfound");
const {PrismaSingleton} = require ("../prisma/prisma.client");

const TraerPerfilEmpresa = async (id) => {
    const perfil = await PrismaSingleton.perfilEmpresa.findUnique({
        where: {empresaId: Number (id)}
    })

    if (!perfil || perfil === null){
        throw new NotFound ("perfil no encontrado");
    }

    return perfil
}

const ActualizarDescripcionEmpresa = async (id, data) => {
    const perfil = await PrismaSingleton.perfilEmpresa.update({
        where: {empresaId : Number(id)},
        data: {descripcion : data}
    })
    
    return perfil
} 

module.exports = {
    TraerPerfilEmpresa,
    ActualizarDescripcionEmpresa,
}