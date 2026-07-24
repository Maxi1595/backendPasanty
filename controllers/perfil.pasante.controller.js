const { TraerPerfilPasante, ActualizarDescripcionPasante } = require("../service/perfil.pasante.service");
const { successResponse } = require("../utils/response");


const verPerfilPasante = async (req, res) => {
    const perfil = await TraerPerfilPasante(req.user.id);

    return successResponse (res, perfil, 200);
}   

const cambiarDescripcionPasante = async (req, res) => {
    const perfil = await ActualizarDescripcionPasante(req.user.id, req.body);

    return successResponse(res, perfil, 200);
}

module.exports = {
    verPerfilPasante,
    cambiarDescripcionPasante
}