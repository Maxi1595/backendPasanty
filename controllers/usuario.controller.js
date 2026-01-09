const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const buscarUsuario = async (req, res) => {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: Number(req.user.id) },
            select: {
                nombre: true,
                correo: true
            }
        })

        if (usuario.rol === "invitado") {
            return res.status(403).json({ mensaje: "Debe iniciar sesion primero" })
        }
        let datos = { ...usuario };

        // Si el rol es empresa, incluye datos de la empresa
        if (usuario.rol === "5") {
            const empresa = await prisma.empresa.findUnique({
                where: { usuarioId: usuario.id },
                select: {
                    direccion: true,
                    telefono: true,
                    especialidad: true
                }
            });
            datos = { ...usuario, empresa };
        }

        // Si el rol es pasante, incluye datos del pasante
        if (usuario.rol === "3") {
            const pasante = await prisma.pasante.findUnique({
                where: { usuarioId: usuario.id },
                select: {
                    especialidad: true,
                    estado: true,
                    cv: true
                }
            });
            datos = { ...usuario, pasante };
        }
        console.log(datos);
        return res.json(datos);
    } catch (error) {
        return res.status(400).json({ mensaje: "error al buscar a este usuario: " + error });
    }
}

module.exports = {
    buscarUsuario
}