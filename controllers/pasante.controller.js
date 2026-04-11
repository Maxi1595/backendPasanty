// controllers/pasante.controller.js
const { PrismaClient } = require('@prisma/client');
const { json, response } = require('express');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const path = require('path');
const { successResponse, errorResponse } = require('../utils/response');
const { traerPasantes, trearPasantePorId, cambiarPasante, borrarPasante } = require('../service/pasante.service.js');


const obtenerPasantes = async (req, res) => {
  try {
    const pasantes = await traerPasantes();
    return successResponse(res, pasantes, 200);
  } catch (error) {
    return errorResponse(res, "Error al obtener pasantes", 500);
  }
};

const obtenerPasantesPorId = async (req, res) => {
    const pasante = await trearPasantePorId(req.params.id);

    return successResponse(res, pasante, 200);
}

const actualizarPasante = async (req, res) => {
  try {
    cambiarPasante(req.params.id, req.body)
    return successResponse(res, "Se ha actualizado el pasante", 200)
  }
  catch (error) {
    return errorResponse(res, "Error al actualizar el pasante", 500)
  }
}

const eliminarPasante = async (req, res) => {
  try {
    borrarPasante(req.params.id);
    return successResponse(res, "Se ha eliminado el pasante", 200)
  }
  catch (error) {
    return errorResponse(res, "Error al eliminar el pasante", 500)
  }
}


//Cambiarlos para el service

const subirCV = async (req, res) => {
  const pasanteId = parseInt(req.user.id);
  if (!req.file) {
    return res.status(400).json({ mensaje: "No se subió ningún archivo" });
  }

  try {
    const rutaCV = req.file.path;
    const pasanteActualizado = await prisma.pasante.update({
      where: { usuarioId: pasanteId },
      data: { cv: rutaCV }
    });

    res.status(200).json({ mensaje: "CV subido exitosamente", pasante: pasanteActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al subir el CV", error });
  }
};

const verPropioCV = async (req, res) => {
  try {
    const pasante = await prisma.pasante.findUnique({
      where: { usuarioId: Number(req.user.id) },
      select: { cv: true }
    })

    if (!pasante.cv) {
      return res.status(404).json({ mensaje: "Aun no subes tu CV" });
    }

    const CV = path.resolve(__dirname, '..', pasante.cv);

    return res.sendFile(CV);
  } catch (error) {
    return res.status(404).json({ mensaje: "no se encontro el CV", error });
  }
}

const verCV = async (req, res) => {
  try {
    const pasante = await prisma.pasante.findUnique({
      where: { id: Number(req.params.id) },
      select: { cv: true }
    })

    if (!pasante.cv) {
      return res.status(404).json({ mensaje: "El pasante todavia no ha subido su CV" });
    }

    if (!pasante) {
      return res.status(404).json({ mensaje: "No se encontró ningún pasante con ese ID" });
    }

    const CV = path.resolve(__dirname, '..', pasante.cv);

    return res.sendFile(CV);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener el CV",
      error: error.message,
      stack: error.stack
    });
  }
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