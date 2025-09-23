const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//mostrara todos sin excepciones
const verPorstulantes = async (req, res) => {
    try {
        const postulaciones = await prisma.postulante.findMany();
        res.json(postulaciones);
    } catch (error) {
        res.status(500).json({ mensaje: "No se encontraron postulaciones" });
    }
}
//mostrara solo los que estan para la vacante x
const buscarPorVacante = async (req, res) => {
    try {
        const postulaciones = await prisma.postulante.findMany({
            where: { vacanteId: Number(req.params.id) }
        })
        res.json(postulaciones);
    } catch (error) {
        res.status(500).json({ mensaje: "No se encontraron postulaciones para esta vacante" });
    }
}
//mostrara solo las postulaciones de x pasante
const buscarPorPasante = async (req, res) => {
    try {
        const postulaciones = await prisma.postulante.findMany({
            where: { pasanteId: Number(req.params.id) }
        })
        res.json(postulaciones);
    } catch (error) {
        res.status(500).json({ mensaje: "No se encontraron postulaciones en este pasante" });
    }
}

const crearPostulacion = async (req, res) => {
    try {
        const vacante = await prisma.vacante.findUnique({
            where: { id: Number(req.params.id) }
        })
        const pasante = await prisma.pasante.findUnique({
            where: { usuarioId: req.user.id},
            select: {id: true}
        })
        if (vacante && pasante) {
            const postulante = await prisma.postulante.create({
                data: {
                    pasanteId: pasante.id,
                    vacanteId: Number(req.params.id)
                }
            })
            res.status(201).json({ mensaje: "Postulacion exitosa", postulante});
        }else{
            res.status(404).json({ mensaje: "No existe esa vacante"});
        }
    } catch (error) {
        if (error.code === 'P2002'){
            return res.status(409).json({ mensaje: "Ya estás postulado a esta vacante" });
        }
        res.status(400).json({ mensaje: "No se pudo postular a esta vacante", error });
    }
}

const eliminarPostulacion = async (req, res) => {
    try{
        const postulacion = await prisma.postulante.delete({
            where : { id: Number(req.params.id) }
        })
        res.status(200).json({ mensaje: "Se elimino la postulacion" });
    }catch(error){
        res.status(400).json({ mensaje: "Hubo un error al querer eliminar la postulacion"});
    }
}

const actualizarEstado = async (req, res) => {
    try{
        const postulante = await prisma.postulante.update({
            where: { id: Number(req.params.id)},
            data: { estado: req.body.estado }
        })
        res.status(201).json({ mensaje: `Se ha ${req.body.estado} la postulacion` })
    }catch(error){
        res.status(400).json({ mensaje: "Ha sucedido un error al actualizar el estado de la postulacion"})
    }
} 

const buscarEstado = async (req, res) => {
    try{
        const postulacion = await prisma.postulante.findMany({
            where: { pasanteId: req.user.id }
        })
        res.status(200).json({postulacion});
    } catch (error){
        res.status(404).json({ mensaje: "No se ha encontrado ninguna postulacion, postulece a alguna vacante"});
    }
}

module.exports = {
    verPorstulantes,
    buscarPorVacante,
    buscarPorPasante,
    crearPostulacion,
    eliminarPostulacion,
    actualizarEstado,
    buscarEstado
}