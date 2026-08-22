const { traerEmpresaPorId } = require('../service/empresa.service');
const { traerUsuarioPorId } = require('../service/usuario.service');
const { successResponse } = require('../utils/response');

const buscarEmpresaById = async (req, res) => {
    const usuario = await traerUsuarioPorId(req.params.id)
    
    const empresa = await traerEmpresaPorId(usuario.id);

    let data = {...usuario, empresa}

    return successResponse(res, data, 200);
}

module.exports = {
    buscarEmpresaById,
};