// controllers/pasante.controller.js
const { json, response } = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const path = require('path');
const { successResponse, errorResponse } = require('../utils/response');
const { traerPasantes, trearPasantePorId, cambiarPasante, borrarPasante, traerCV, actualizarCV } = require('../service/pasante.service.js');


const obtenerPasantes = async (req, res) => {
    const pasantes = await traerPasantes();

    return successResponse(res, pasantes, 200);
};

const obtenerPasantesPorId = async (req, res) => {
    const pasante = await trearPasantePorId(req.params.id);

    return successResponse(res, pasante, 200);
}

const actualizarPasante = async (req, res) => {
    cambiarPasante(req.params.id, req.body)

    return successResponse(res, "Se ha actualizado el pasante", 200)
}

const eliminarPasante = async (req, res) => {
    const pasante = await borrarPasante(req.params.id);

    return successResponse(res, "Se ha eliminado el pasante", 200)
}


//Cambiarlos para el service

const subirCV = async (req, res) => {
    if (!req.file) throw new BadRequestError('No se subió ningún archivo');

    const pasante = await actualizarCV(Number(req.user.id), req.file.path);

    return successResponse(res, pasante, 200);
}

const verPropioCV = async (req, res) => {
    const pasante = await traerCV({ usuarioId: Number(req.user.id) });
    return successResponse(res, { url: pasante.cv }, 200);
}

const verCV = async (req, res) => {
    const pasante = await traerCV({ id: Number(req.params.id) })
    const urlInline = pasante.cv.replace('/upload/', '/upload/fl_inline/');
    return res.redirect(urlInline);

}


module.exports = {
    obtenerPasantes,
    obtenerPasantesPorId,
    actualizarPasante,
    eliminarPasante,
    subirCV,
    verPropioCV,
    verCV,
};