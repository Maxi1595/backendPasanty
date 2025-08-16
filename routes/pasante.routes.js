// routes/pasante.routes.js
const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multer");
const { obtenerPasantes, crearPasante, actualizarPasante, eliminarPasante, subirCV } = require('../controllers/pasante.controller');

// GET /api/pasantes → Obtener todos los pasantes
router.get('/', obtenerPasantes);

// POST /api/pasantes → Crear un nuevo pasante
router.post('/', crearPasante);

//agregar autorizacion de rol
router.put('/:id', actualizarPasante);

//agregar autorizacion de rol
router.delete('/:id', eliminarPasante);

//agregar autorizacion de rol
router.post('/subir-cv/:id', upload.single('cv'), subirCV);

module.exports = router;
