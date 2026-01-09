const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

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
        const empresa = await prisma.empresa.findUnique({
            where: { usuarioId: req.user.id }
        });

        const postulaciones = await prisma.postulante.findMany({
            where: {
                vacante: {
                    empresaId: empresa.id
                },
                estado: "pendiente"
            },
            include: {
                pasante: {
                    include: {
                        usuario: {
                            select: {
                                nombre: true,
                                correo: true
                            }
                        }
                    }
                },
                vacante: {
                    select: {
                        titulo: true
                    }
                }
            }
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

const buscarPostulacionPorId = async (req, res) => {
    try {
        const postulacion = await prisma.postulante.findUnique({
            where: { id: Number(req.params.id) },
            include: {
                pasante: {
                    include: {
                        usuario: {
                            select: {
                                nombre: true,
                                correo: true
                            }
                        }
                    }
                },
                vacante: {
                    select: {
                        estado: true,
                        empresaId: true
                    }
                }
            }
        })

        res.json(postulacion);
    } catch (error) {
        res.status(404).json({ mensaje: "No se ha encontrado esa postulacion" })
    }
}

const crearPostulacion = async (req, res) => {
    try {
        const vacante = await prisma.vacante.findUnique({
            where: { id: Number(req.params.id) }
        })
        const pasante = await prisma.pasante.findUnique({
            where: { usuarioId: req.user.id },
            select: { id: true }
        })

        if (vacante && pasante) {
            const postulante = await prisma.postulante.create({
                data: {
                    pasanteId: pasante.id,
                    vacanteId: Number(req.params.id)
                }
            })
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
        const postulacion = await prisma.postulante.delete({
            where: { id: Number(req.params.id) }
        })
        res.status(200).json({ mensaje: "Se elimino la postulacion" });
    } catch (error) {
        res.status(400).json({ mensaje: "Hubo un error al querer eliminar la postulacion" });
    }
}

const actualizarEstado = async (req, res) => {
    try {
        const postulante = await prisma.postulante.update({
            where: { id: Number(req.params.id) },
            data: { estado: req.body.estado }
        })

        if (req.body.estado === "Aceptado") {
            const vacante = await prisma.vacante.update({
                where: { id: postulante.vacanteId },
                data: { estado: "cerrado" }
            })
        }
        res.status(200).json({ mensaje: `Se ha ${req.body.estado} la postulacion` })
    } catch (error) {
        res.status(400).json({ mensaje: "Ha sucedido un error al actualizar el estado de la postulacion" })
    }
}

const buscarEstado = async (req, res) => {
    try {
        const pasante = await prisma.pasante.findUnique({
            where: { usuarioId: req.user.id },
            select: { id: true }
        })

        if (!pasante) {
            return res.status(404).json({ mensaje: "No se encontró un pasante asociado a este usuario" });
        }

        const postulacion = await prisma.postulante.findMany({
            where: { pasanteId: pasante.id },
            include: {
                vacante: {
                    select: {
                        titulo: true,
                        descripcion: true
                    }
                }
            }
        })
        res.json(postulacion);
    } catch (error) {
        res.status(404).json({ mensaje: "No se ha encontrado ninguna postulacion, postulece a alguna vacante" });
    }
}

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