const express = require('express');
const router = express.Router();
const { uploadImagen } = require("../middlewares/multer");
const { buscarUsuario, agregarFoto, obtenerFoto} = require('../controllers/usuario.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.get('/traerUsuario', verificarToken, buscarUsuario );
router.get('/foto/:id', obtenerFoto);
router.put('/cambiar/foto', verificarToken, uploadImagen.single('foto'), agregarFoto);

module.exports = router;