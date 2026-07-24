const { TraerPerfilEmpresa, ActualizarDescripcionEmpresa } = require("../service/perfil.empresa.service");
const { successResponse } = require("../utils/response");


const verPerfilEmpresa = async (req, res) => {
    const perfil = await TraerPerfilEmpresa (req.user.id);

    return successResponse(res, perfil, 200);
}

const cambiarDescripcionEmpresa = async (req, res) => {
    const perfil = await ActualizarDescripcionEmpresa(req.user.id, req.body);

    return successResponse(res, perfil, 200);
}

module.exports = {
    verPerfilEmpresa,
    cambiarDescripcionEmpresa,
}