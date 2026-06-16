const express = require('express');
const router = express.Router();
const { registrarPasante, registrarEmpresa, login, refresh } = require('../controllers/auth.controller');
const { validation } = require ('../middlewares/valideta.middleware');
const { schemaLogin } = require ('../schemas/login.schema')

router.post('/registro/pasante', registrarPasante);
router.post('/registro/empresa', registrarEmpresa);
router.post('/login', validation(schemaLogin), login);
router.post('/refreshToken', refresh);

module.exports = router;
