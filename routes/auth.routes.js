const express = require('express');
const router = express.Router();
const { registrarPasante, registrarEmpresa, login } = require('../controllers/auth.controller');

router.post('/registro/pasante', registrarPasante);
router.post('/registro/empresa', registrarEmpresa);
router.post('/login', login);

module.exports = router;
