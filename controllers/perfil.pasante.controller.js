const { TraerPerfilPasante, ActualizarPerfilPasante } = require("../service/perfil.pasante.service");
const { successResponse } = require("../utils/response");
const { traerPasantePorUsuarioId } = require("../service/pasante.service")


const verPerfilPasante = async (req, res) => {
    const pasante = await traerPasantePorUsuarioId(req.user.id)

    const perfil = await TraerPerfilPasante(pasante.id);

    return successResponse(res, perfil, 200);
}

const verPerfilPasantePorId = async (req, res) => {
    const perfil = await TraerPerfilPasante(req.params.id)

    return successResponse(res, perfil, 200);
}

const cambiarPerfilPasante = async (req, res) => {
    const pasante = await traerPasantePorUsuarioId(req.user.id)

    const perfil = await ActualizarPerfilPasante(pasante.id, req.body);

    return successResponse(res, perfil, 200);
}

module.exports = {
    verPerfilPasante,
    verPerfilPasantePorId,
    cambiarPerfilPasante
}