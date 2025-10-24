// routes/pasante.routes.js
const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multer");
const { obtenerPasantes, obtenerPasantesPorId, actualizarPasante, eliminarPasante, subirCV, verCV } = require('../controllers/pasante.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

// GET /api/pasantes → Obtener todos los pasantes
router.get('/buscar', obtenerPasantes);

router.get('/buscar/:id', obtenerPasantesPorId);

// POST /api/pasantes → Crear un nuevo pasante
// router.post('/', crearPasante);

//agregar autorizacion de rol
router.put('/:id', actualizarPasante);

//agregar autorizacion de rol
router.delete('/:id', eliminarPasante);

//agregar autorizacion de rol
router.post('/subir-cv',verificarToken, upload.single('cv'), subirCV);

router.get('/cv', verificarToken, verCV);

module.exports = router;
