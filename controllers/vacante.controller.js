const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const crearVacantes = async (req, res) => {
    const empresa = await prisma.empresa.findUnique({
        where: { usuarioId: Number(req.user.id) }
    })
    const nuevaVacante = await prisma.vacante.create({
        data: {
            ...req.body,
            empresaId: empresa.id,
        }
    });
    res.status(201).json({ mensaje: "se creo un nuevo vacante", vacante: nuevaVacante });
}

const obtenerVacantes = async (req, res) => {
    const vacantes = await prisma.vacante.findMany({
        where: { estado: "abierto" }
    });
    res.json(vacantes);
}

const obtenerVacantePorId = async (req, res) => {
    const vacante = await prisma.vacante.findUnique({
        where: { id: Number(req.params.id) }
    });
    res.json(vacante);
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