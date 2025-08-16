const express = require('express');
const router = express.Router();
const { registrarEmpresa, loginEmpresa } = require('../controllers/auth.controller');

router.post('/registro', registrarEmpresa);
router.post('/login', loginEmpresa);

module.exports = router;
