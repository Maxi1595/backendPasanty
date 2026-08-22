const express = require('express');
const router = express.Router();
const { registrarPasante, registrarEmpresa, login, refresh, verificador } = require('../controllers/auth.controller');
const { validation } = require('../middlewares/valideta.middleware');
const { schemaLogin } = require('../schemas/login.schema');
const { schemaRegistrarEmpresa, schemaRegistrarPasante } = require('../schemas/registrar.schema');

router.post('/registro/pasante', validation(schemaRegistrarPasante), registrarPasante);
router.post('/registro/empresa', validation(schemaRegistrarEmpresa), registrarEmpresa);
router.post('/login', validation(schemaLogin), login);
router.post('/refreshToken', refresh);

router.get('/verificar/:email/:token', verificador)

module.exports = router;
