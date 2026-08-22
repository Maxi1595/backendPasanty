const { PrismaClient } = require('@prisma/client');
const { successResponse } = require('../utils/response');
const { traerEmpresaPorId } = require('../service/empresa.service');
const { crearVacante, traerVacantePorId } = require ('../service/vacante.service')
const prisma = new PrismaClient();

const crearVacantes = async (req, res) => {
    const empresa = await traerEmpresaPorId(req.user.id);

    const vacante = await crearVacante(empresa.id, req.body);

    return successResponse(res, vacante, 200)
}

const obtenerVacantes = async (req, res) => {
    const vacantes = await prisma.vacante.findMany({
        where: { estado: "abierto" }
    });

    return successResponse(res, vacantes, 200);
}

const obtenerVacantePorId = async (req, res) => {
    const vacante = await traerVacantePorId(req.params.id)

    return successResponse(res, vacante, 200)
}

const modificarVacante = async (req, res) => {
    const vacante = await prisma.vacante.update({
        where: { id: Number(req.params.id) },
        data: req.body,
    });
    res.json(vacante)
}


const cambiarEstadoVacante = async (req, res) => { //no se ha agregado

    const { estado } = req.body;
    if (!["abierta", "cerrada"].includes(estado)) {
        return res.status(400).json({ mensaje: "Estado inválido" });
    }
    const vacante = await prisma.vacante.update({
        where: {
            id: Number(req.params.id),
            empresaId: req.body.id //verifica que la empresa dueña de esta vacante sea la que se modifique  
        },
        data: { estado: req.body.estado }
    })
    res.json(vacante)
}

const eliminarVacante = async (req, res) => {
    const vacante = await prisma.vacante.delete({
        where: { id: Number(req.params.id) }
    })
    res.status(200).json({ mensaje: "Se ha eliminado la vacante", vacante })
}


module.exports = {
    crearVacantes,
    obtenerVacantes,
    obtenerVacantePorId,
    modificarVacante,
    cambiarEstadoVacante, //no se ha agregado
    eliminarVacante,
};