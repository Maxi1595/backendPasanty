const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const { verificarRol } = require ('../middlewares/auth.middleware');

const crearVacantes = async (req, res) => {
    try{
        const nuevaVacante = await prisma.vacante.create({
            data: {
                ...req.body,
                empresaId: req.user.id,
            }
        });
        res.status(201).json({mensaje: "se creo un nuevo vacante", vacante: nuevaVacante});
    }catch(error){
        res.status(400).json({ mensaje: "Ha ocurrido un error al crear la vacante", error});
    }
}   

const obtenerVacantes = async (req, res) => {
    try{
        const vacantes = await prisma.vacante.findMany();
        res.json(vacantes);
    }catch(error){
        res.status(400).json({ mensaje: "No hay ninguna vacante", error});
    }
}

const obtenerVacantePorId = async (req, res) => {
    try{
        const vacante = await prisma.vacante.findUnique({
            where: { id: Number(req.params.id) }
        });
        res.json(vacante);
    }catch(error){
        res.status(500).json({ mensaje: "error al encontrar vacantes", error})
    }
}

const modificarVacante = async (req, res) => {
    try{
        const vacante = await prisma.vacante.update({
            where: { id: Number(req.params.id)},
            data: req.body,
        });
        res.json(vacante)
    }
    catch(error){
        res.status(400).json({ mensaje: "Hubo un error al  modificar la vacante", error});
    }
}

const cambiarEstadoVacante = async (req, res) => { //no se ha agregado
    try{
        const { estado } = req.body;
        if (!["abierta", "cerrada"].includes(estado)) {
        return res.status(400).json({ mensaje: "Estado inválido" });
    }
        const vacante = await prisma.vacante.update({
            where: { 
                id: Number(req.params.id),
                empresaId: req.body.id //verifica que la empresa dueña de esta vacante sea la que se modifique  
            },
            data: {estado: req.body.estado}    
        })
        res.json(vacante)
    }catch(error){
        res.status(400).json({ mensaje: "Hubo un error al  modificar la vacante", error});
    }
}

const eliminarVacante = async (req, res) => {
        try{
            const vacante = await prisma.vacante.delete({
                where : { id: Number( req.params.id )}
            })
            res.status(200).json({ mensaje: "Se ha eliminado la vacante", vacante})
        }
        catch(error){
            res.status(400).json({ mensaje: "Ha sucedido un error al querer eliminar la vacante", error});
        }
}

module.exports = {
    crearVacantes,
    obtenerVacantes,
    obtenerVacantePorId,
    modificarVacante,
    cambiarEstadoVacante, //no se ha agregado
    eliminarVacante,
};