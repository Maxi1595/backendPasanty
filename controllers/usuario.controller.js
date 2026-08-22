const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { cambiarFoto, traerFoto, traerUsuarioPorId } = require('../service/usuario.service');
const { successResponse } = require('../utils/response');
const { traerPasantePorUsuarioId } = require('../service/pasante.service')
const { traerEmpresaPorId } = require('../service/empresa.service')

const buscarUsuario = async (req, res) => {
    const usuario = await traerUsuarioPorId(req.user.id)

    let datos = { ...usuario };

    // Si el rol es empresa, incluye datos de la empresa
    if (usuario.rol === "5") {
        const empresa = await traerEmpresaPorId(usuario.id);
        datos = { ...usuario, empresa };
    }

    // Si el rol es pasante, incluye datos del pasante
    if (usuario.rol === "3") {
        const pasante = await traerPasantePorUsuarioId(usuario.id)
        datos = { ...usuario, pasante };
    }

    return successResponse(res, datos, 200);
}

const agregarFoto = async (req, res) => {
    const usuario = await cambiarFoto(req.user.id, req.file.path)

    return successResponse(res, usuario, 200);
}

const obtenerFoto = async (req, res) => {
    const foto = await traerFoto(req.params.id);

    return successResponse(res, foto, 200)
}

module.exports = {
    buscarUsuario,
    agregarFoto,
    obtenerFoto,
}