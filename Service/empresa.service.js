const { PrismaClient } = require ("@prisma/client");
const prisma = new PrismaClient;

const traerEmpresas = async () => {
    const empresas = await prisma.empresa.findMany();

    return empresas;
}

const traerEmpresaPorId = async () => {
    const empresa = await prisma.empresa.findUnique({
        where: { id: Number(id) }
    })

    return empresa;
}

module.exports = {
    traerEmpresas,
    traerEmpresaPorId,
}