const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const { traerEmpresaPorId } = require('../service/empresa.service');
const { traerPostulantes, traerPostulacionPorVacante, traerPostulacionPorPasante, traerPostulacionPorId, traerPorEstado, borrarPostulacion, cambiarEstado, postPostulacion, ConteoPostulaciones, ConteoPostulacionesPasante } = require('../service/postulante.service');
const { successResponse, errorResponse } = require('../utils/response');
const { traerVacantePorId } = require('../service/vacante.service');
const { trearPasantePorId } = require('../service/pasante.service');

//mostrara todos sin excepciones
const verPorstulantes = async (req, res) => {
    const postulaciones = await traerPostulantes();

    return successResponse(res, postulaciones, 200);
}

//mostrara solo los que estan para la vacante x
const buscarPorVacante = async (req, res) => {
    const empresa = await traerEmpresaPorId(req.user.id);

    const postulaciones = await traerPostulacionPorVacante(empresa);

    return successResponse(res, postulaciones, 200);
}
//mostrara solo las postulaciones de x pasante
const buscarPorPasante = async (req, res) => {
    const postulaciones = await traerPostulacionPorPasante();

    return successResponse(res, postulaciones, 200);
}

const buscarPostulacionPorId = async (req, res) => {

    const postulacion = await traerPostulacionPorId(req.params.id);

    return successResponse(res, postulacion, 200);
}

const crearPostulacion = async (req, res) => {

    const vacante = await traerVacantePorId(req.params.id);

    const pasante = await trearPasantePorId(req.user.id);

    const postulante = await postPostulacion(pasante.id , vacante.id);
    
    return successResponse(res, postulante, 200);
}

const eliminarPostulacion = async (req, res) => {
    await borrarPostulacion(req.params.id);

    return successResponse(res, "Se ha eliminado la postulacion", 200);
}

const actualizarEstado = async (req, res) => {
    const postulante = await cambiarEstado(req.params.id, req.body.estado);

    if (req.body.estado === "Aceptado") {
        const vacante = await cerrarVacante(postulante.vacanteId);
    }
    return successResponse(res, `Se ha ${req.body.estado} la postulacion`, 200);
}

const buscarEstado = async (req, res) => {
    const pasante = await trearPasantePorId(req.user.id);

    const postulacion = await traerPorEstado(pasante);
    console.log(postulacion);
    return successResponse(res, postulacion, 200);
}

// //revisar
// const verCVPorPostulacion = async (req, res) => {
//     try {
//         const postulacionId = Number(req.params.id);

//         const postulacion = await prisma.postulante.findUnique({
//             where: { id: postulacionId },
//             select: { pasanteId: true }
//         });

//         if (!postulacion) {
//             return res.status(404).json({ mensaje: "No existe esa postulación" });
//         }

//         const pasante = await prisma.pasante.findUnique({
//             where: { id: postulacion.pasanteId },
//             select: { cv: true }
//         });

//         if (!pasante.cv) {
//             return res.status(404).json({ mensaje: "El pasante todavia no ha subido su CV" });
//         }

//         if (!pasante) {
//             return res.status(404).json({ mensaje: "No se encontró ningún pasante con ese ID" });
//         }

//         const CV = path.resolve(__dirname, '..', pasante.cv);

//         return res.sendFile(CV);
//     } catch (error) {
//         return res.status(500).json({
//             mensaje: "Error al obtener el CV",
//             error: error.message,
//             stack: error.stack
//         });
//     }
// }


const contadorPostulacion = async (req, res) => {
    const conteo = await ConteoPostulacionesPasante(req.user.id);

    return successResponse(res, conteo, 200);
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
    // verCVPorPostulacion,
    contadorPostulacion,
}