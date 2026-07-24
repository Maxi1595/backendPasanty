const express = require('express');
const router = express.Router();
const { cambiarDescripcionPasante, verPerfilPasante } = require('../controllers/perfil.pasante.controller');
const { cambiarDescripcionEmpresa, verPerfilEmpresa } = require('../controllers/perfil.empresa.controller');
const { verificarToken, verificarRol } = require('../middlewares/auth.middleware');

//pasante
router.get('/ver/pasante', verPerfilPasante, verificarToken, verificarRol(3));
router.put('/cambiar/descripcion/pasante', cambiarDescripcionPasante, verificarToken, verificarRol(3));

//empresa
router.get('/ver/empresa', verPerfilEmpresa, verificarToken, verificarRol(5));
router.put('/cambiar/descripcion/empresa', cambiarDescripcionEmpresa, verificarToken, verificarRol(5));

module.exports = router;