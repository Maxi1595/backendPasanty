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
            where: {
                id: Number(req.params.id)
            }
        })
        if (vacante) {
            const postulacion = await prisma.postulante.create({
                data: {
                    pasanteId: req.user.id,
                    vacanteId: Number(req.params.id)
                }
            })
            res.status(201).json({ mensaje: "Postulacion exitosa", postulacion});
        }else{
            res.status(404).json({ mensaje: "No existe esa vacante"});
        }
    } catch (error) {
        if (error.code === 'P2002'){
            return res.status(409).json({ mensaje: "Ya estás postulado a esta vacante" });
        }
        res.status(400).json({ mensaje: "No se pudo postular a esta vacante" });
    }
}

const eliminarPostulacion = async (req, res) => {
    try{
        const postulacion = await prisma.postulante.delete({
            where : { id: req.params.id }
        })
        res.status(200).json({ mensaje: "Se elimino la postulacion" });
    }catch(error){
        res.status(400).json({ mensaje: "Hubo un error al querer eliminar la postulacion"});
    }
}

module.exports = {
    verPorstulantes,
    buscarPorVacante,
    buscarPorPasante,
    crearPostulacion,
    eliminarPostulacion
}