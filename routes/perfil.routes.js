const express = require('express');
const router = express.Router();
const { uploadImagen } = require("../middlewares/multer");
const { cambiarPerfilPasante, verPerfilPasante, verPerfilPasantePorId } = require('../controllers/perfil.pasante.controller');
const { cambiarPerfilEmpresa, verPerfilEmpresa, verPerfilEmpresaPorParams, cambiarFotoBanner } = require('../controllers/perfil.empresa.controller');
const { verificarToken, verificarRol } = require('../middlewares/auth.middleware');

//pasante
router.get('/ver/pasante', verificarToken, verificarRol(3), verPerfilPasante);
router.get('/ver/pasante/:id', verPerfilPasantePorId)
router.put('/cambiar/pasante', verificarToken, verificarRol(3), cambiarPerfilPasante);

//empresa
router.get('/ver/empresa', verificarToken, verificarRol(5), verPerfilEmpresa);
router.get('/ver/empresa/:id', verificarToken, verPerfilEmpresaPorParams);
router.put('/cambiar/empresa', verificarToken, verificarRol(5), cambiarPerfilEmpresa);
router.put('/cambiar/banner', verificarToken, verificarRol(5), uploadImagen.single('banner'), cambiarFotoBanner);

module.exports = router;