const express = require("express");
const router = express.Router();
const { verPorstulantes, buscarPorVacante, buscarPorPasante, buscarPostulacionPorId, crearPostulacion, eliminarPostulacion, actualizarEstado, buscarEstado, verCVPorPostulacion } = require ('../controllers/postulante.controller');
const { verificarToken, verificarRol } = require ('../middlewares/auth.middleware');

router.get('/verTodos', verificarToken, verificarRol(5), verPorstulantes);
router.get('/verPorVacante', verificarToken, verificarRol(5), buscarPorVacante);
router.get('/verPorPasante/:id', verificarToken, verificarRol(5), buscarPorPasante);
router.get('/buscarPorId/:id', verificarToken, verificarRol(5), buscarPostulacionPorId);
router.get('/verEstado', verificarToken, verificarRol(3), buscarEstado)
router.post('/postularse/:id', verificarToken, verificarRol(3), crearPostulacion);
router.delete('/eliminarPostulacion/:id', verificarToken, verificarRol(5), eliminarPostulacion);
router.patch('/cambiarEstado/:id', verificarToken, verificarRol(5), actualizarEstado);
router.get('/cv/:id', verificarToken, verificarRol(5), verCVPorPostulacion);

module.exports = router;