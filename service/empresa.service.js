const {PrismaSingleton} = require('../prisma/prisma.client');
const NotFound = require('../handler/error.notfound');

const traerEmpresas = async () => {
    const empresas = await PrismaSingleton.empresa.findMany();

    if (empresas === null || !empresas) {
        throw new NotFound("empresas no encontradas");
    }

    return empresas;
}

const traerEmpresaPorId = async (id) => {
    const empresa = await PrismaSingleton.empresa.findUnique({
        where: { usuarioId: Number(id) }
    })

    if (empresa === null || !empresa){
        throw new NotFound("empresa no encontrada");
    }

    return empresa;
}

const crearEmpresa = async (direccion, telefono, especialidad, id) => {
    const empresa = await PrismaSingleton.empresa.create({
        data: {
            direccion: direccion,
            telefono: telefono,
            especialidad: especialidad,
            usuarioId: id
        }
    })

    return empresa;
}

module.exports = {
    traerEmpresas,
    traerEmpresaPorId,
    crearEmpresa,
}