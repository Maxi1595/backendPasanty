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

const modificarVacante = async (req, res) => {
    //if(req.user.id == vacante.empresaId){
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
    //}
}

const eliminarVacante = async (req, res) => {
    //if(req.user.id == vacante.empresaId){
        try{
            const vacante = await prisma.vacante.delete({
                where : { id: Number( req.params.id )}
            })
            res.status(200).json({ mensaje: "Se ha eliminado la vacante", vacante})
        }
        catch(error){
            res.status(400).json({ mensaje: "Ha sucedido un error al querer eliminar la vacante", error});
        }
    //}
}

module.exports = {
    crearVacantes,
    obtenerVacantes,
    modificarVacante,
    eliminarVacante,
};