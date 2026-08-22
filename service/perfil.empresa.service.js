const NotFound = require("../handler/error.notfound");
const {PrismaSingleton} = require ("../prisma/prisma.client");
const { cambiarFoto } = require("./usuario.service");

const TraerPerfilEmpresa = async (id) => {
    const perfil = await PrismaSingleton.perfilEmpresa.findUnique({
        where: {empresaId: Number (id)}
    })

    if (!perfil || perfil === null){
        throw new NotFound ("perfil no encontrado");
    }

    return perfil
}

const ActualizarPerfilEmpresa = async (id, data) => {
    const perfil = await PrismaSingleton.perfilEmpresa.update({
        where: {empresaId : Number(id)},
        data: data
    })
    
    return perfil
} 

const CrearPerfilEmpresa = async (id) => {
    const perfil = await PrismaSingleton.perfilEmpresa.create({
        data: { empresaId: id}
    })
    
    return perfil
}

const CambiarBanner = async (id, url) => {
    const foto = await PrismaSingleton.perfilEmpresa.update({
        where: { empresaId: Number(id) },
        data: { banner: url }
    })

    return foto;
}

module.exports = {
    TraerPerfilEmpresa,
    ActualizarPerfilEmpresa,
    CrearPerfilEmpresa,
    CambiarBanner,
}