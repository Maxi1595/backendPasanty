const express = require("express");
const router = express.Router();
const { crearVacantes, obtenerVacantes, obtenerVacantePorId, modificarVacante, eliminarVacante } = require ('../controllers/vacante.controller');
const { verificarToken, verificarRol } = require ('../middlewares/auth.middleware');

router.post('/crear', verificarToken, verificarRol(5),crearVacantes);
router.get('/buscar', obtenerVacantes);
router.get('/buscar/:id', obtenerVacantePorId);
router.put('/modificar/:id', verificarToken, verificarRol(5), modificarVacante);
router.delete('/eliminar/:id', verificarToken, /*verificarRol(1),*/ eliminarVacante);

module.exports = router;