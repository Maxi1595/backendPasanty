const express = require('express');
const router = express.Router();
const { buscarUsuario } = require('../controllers/usuario.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.get('/traerUsuario', verificarToken, buscarUsuario );

module.exports = router;