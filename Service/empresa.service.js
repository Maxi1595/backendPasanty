const { PrismaClient } = require ("@prisma/client");
const prisma = new PrismaClient;

const traerEmpresas = async () => {
    const empresas = await prisma.empresa.findMany();

    return empresas;
}

const traerEmpresaPorId = async (id) => {
    const empresa = await prisma.empresa.findUnique({
        where: { usuarioId: Number(id) }
    })

    return empresa;
}

const crearEmpresa = async (direccion, telefono, especialidad, id) => {
    const empresa = await prisma.empresa.create({
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