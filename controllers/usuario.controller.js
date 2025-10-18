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

        if(usuario.rol === "invitado"){
            return res.status(403).json({ mensaje: "Debe iniciar sesion primero" })
        }

        return res.json( usuario );
    }catch(error){
        return res.status(400).json({ mensaje: "error al buscar a este usuario: " + error });
    }
}

module.exports = {
    buscarUsuario
}