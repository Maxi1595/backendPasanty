const {PrismaSingleton} = require('../prisma/prisma.client');
const NotFound = require('../handler/error.notfound');

const borrarUsuario = async (id) => {
    const usuario = await PrismaSingleton.usuario.delete({
        where: id,
    })
}

module.exports = { borrarUsuario };