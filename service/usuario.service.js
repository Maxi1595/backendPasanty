const { PrismaSingleton } = require('../prisma/prisma.client');
const NotFound = require('../handler/error.notfound');

const borrarUsuario = async (id) => {
    const usuario = await PrismaSingleton.usuario.delete({
        where: id,
    })
}

const cambiarFoto = async (id, foto) => {
    const usuario = await PrismaSingleton.usuario.update({
        where: { id: Number(id) },
        data: { foto: foto }
    })

    return usuario;
}

const traerFoto = async (id) => {
    const foto = await PrismaSingleton.usuario.findUnique({
        where: { id: Number(id) },
        select: { foto: true }
    })

    return foto;
}

const traerUsuarioPorId = async (id) => {
    const usuario = await PrismaSingleton.usuario.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            nombre: true,
            correo: true
        }
    })

    return usuario;
}

module.exports = {
    borrarUsuario,
    cambiarFoto,
    traerFoto,
    traerUsuarioPorId,
};