const express = require("express");
const router = express.Router();
const { verPorstulantes, buscarPorVacante, buscarPorPasante, crearPostulacion, eliminarPostulacion } = require ('../controllers/postulante.controller');
const { verificarToken, verificarRol } = require ('../middlewares/auth.middleware');

router.get('/verTodos', verificarToken, verificarRol(5), verPorstulantes);
router.get('/verPorVacante', verificarToken, verificarRol(5), buscarPorVacante);
router.get('/verPorPasante', verificarToken, verificarRol(5), buscarPorPasante);
router.post('/postularse', verificarToken, verificarRol(3), crearPostulacion);
router.delete('/eliminarPostulacion', verificarToken, verificarRol(5), eliminarPostulacion);

module.exports = router;