const express = require('express');
const { buscarEmpresaById } = require('../controllers/empresa.controller');
const router = express.Router()

router.get('/buscar/:id', buscarEmpresaById);

module.exports = router;