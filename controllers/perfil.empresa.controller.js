const { traerEmpresaPorId } = require("../service/empresa.service");
const { TraerPerfilEmpresa, ActualizarPerfilEmpresa, CambiarBanner } = require("../service/perfil.empresa.service");
const { successResponse } = require("../utils/response");


const verPerfilEmpresa = async (req, res) => {
    const empresa = await traerEmpresaPorId(req.user.id);

    const perfil = await TraerPerfilEmpresa(empresa.id);

    return successResponse(res, perfil, 200);
}

const verPerfilEmpresaPorParams = async (req, res) => {
    const empresa = await traerEmpresaPorId(req.params.id);

    const perfil = await TraerPerfilEmpresa(empresa.id);

    return successResponse(res, perfil, 200);
}

const cambiarPerfilEmpresa = async (req, res) => {
    const empresa = await traerEmpresaPorId(req.user.id);

    const perfil = await ActualizarPerfilEmpresa(empresa.id, req.body);

    return successResponse(res, perfil, 200);
}

const fotoBanner = async (req, res) => {
    const empresa = await traerEmpresaPorId(req.user.id);

    const perfil = await CambiarBanner(empresa.id, req.file.path);

    return successResponse(res, perfil, 200);
}

module.exports = {
    verPerfilEmpresa,
    verPerfilEmpresaPorParams,
    cambiarPerfilEmpresa,
}