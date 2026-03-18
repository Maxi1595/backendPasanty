const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const { traerEmpresaPorId } = require('../service/empresa.service');
const { traerPostulantes, traerPostulacionPorVacante, traerPostulacionPorPasante, traerPostulacionPorId, traerPorEstado, borrarPostulacion, cambiarEstado } = require('../service/postulante.service');
const { successResponse, errorResponse } = require('../utils/response');
const { traerVacantePorId } = require('../service/vacante.service');
const { trearPasantePorId } = require('../service/pasante.service');

//mostrara todos sin excepciones
const verPorstulantes = async (req, res) => {
    try {
        const postulaciones = await traerPostulantes();

        if (object.key(postulaciones).length === 0) {
            return errorResponse(res, "No existen postulaciones", 404);
        }

        return successResponse(res, postulaciones, 200);

    } catch (error) {
        return errorResponse(res, "No se encontraron postulaciones", 500);
    }
}

//mostrara solo los que estan para la vacante x
const buscarPorVacante = async (req, res) => {
    try {
        const empresa = await traerEmpresaPorId(req.user.id);

        const postulaciones = await traerPostulacionPorVacante(empresa);
        if (!postulaciones) {
            return errorResponse(res, "No ahi postulaciones", 404);
        }

        return successResponse(res, postulaciones, 200);
    } catch (error) {
        return errorResponse(res, "No se encontraron postulaciones para esta vacante", 500);
    }
}
//mostrara solo las postulaciones de x pasante
const buscarPorPasante = async (req, res) => {
    try {
        const postulaciones = await traerPostulacionPorPasante();
        res.json(postulaciones);
    } catch (error) {
        res.status(500).json({ mensaje: "No se encontraron postulaciones en este pasante" });
    }
}

const buscarPostulacionPorId = async (req, res) => {
    try {
        const postulacion = await traerPostulacionPorId();

        res.json(postulacion);
    } catch (error) {
        res.status(404).json({ mensaje: "No se ha encontrado esa postulacion" })
    }
}

const crearPostulacion = async (req, res) => {
    try {
        const vacante = await traerVacantePorId(req.params.id);

        const pasante = await trearPasantePorId(req.user.id);

        if (vacante && pasante) {
            const postulante = postPostulacion(pasante, vacante);
            res.status(201).json({ mensaje: "Postulacion exitosa", postulante });
        } else if (!vacante) {
            res.status(404).json({ mensaje: "No existe esa vacante" });
        } else {
            res.status(404).json({ mensaje: "No existe ese pasante" });
        }
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ mensaje: "Ya estás postulado a esta vacante" });
        }
        res.status(400).json({ mensaje: "No se pudo postular a esta vacante", error });
    }
}

const eliminarPostulacion = async (req, res) => {
    try {
        borrarPostulacion(req.params.id);

        return successResponse(res, "Se ha eliminado la postulacion", 200);
    } catch (error) {
        return errorResponse(res, "Hubo un error al querer eliminar la postulacion", 400);
    }
}

const actualizarEstado = async (req, res) => {
    try {
        const postulante = await cambiarEstado(req.params.id, req.body.estado);

        if (req.body.estado === "Aceptado") {
            const vacante = await cerrarVacante(postulante.vacanteId);
        }
        return successResponse(res, `Se ha ${req.body.estado} la postulacion`, 200);
    } catch (error) {
        return errorResponse(res, "Ha sucedido un error al actualizar el estado de la postulacion", 400);
    }
}

const buscarEstado = async (req, res) => {
    try {
        const pasante = await trearPasantePorId(req.user.id);

        if (!pasante) {
            return errorResponse(res, "No se encontró un pasante asociado a este usuario", 404);
        }

        const postulacion = await traerPorEstado(pasante);
        return successResponse(res, postulacion, 200);
    } catch (error) {
        return errorResponse(res, "No se ha encontrado ninguna postulacion, postulece a alguna vacante", 404);
    }
}

//revisar
const verCVPorPostulacion = async (req, res) => {
    try {
        const postulacionId = Number(req.params.id);

        const postulacion = await prisma.postulante.findUnique({
            where: { id: postulacionId },
            select: { pasanteId: true }
        });

        if (!postulacion) {
            return res.status(404).json({ mensaje: "No existe esa postulación" });
        }

        const pasante = await prisma.pasante.findUnique({
            where: { id: postulacion.pasanteId },
            select: { cv: true }
        });

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
    verPorstulantes,
    buscarPorVacante,
    buscarPorPasante,
    buscarPostulacionPorId,
    crearPostulacion,
    eliminarPostulacion,
    actualizarEstado,
    buscarEstado,
    verCVPorPostulacion
}