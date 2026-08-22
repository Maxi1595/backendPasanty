const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const { generarAccessToken, generarRefreshToken, crearUsuario, verificarCuenta } = require('../service/auth.service');
const { crearEmpresa } = require('../service/empresa.service');
const { crearPasante } = require('../service/pasante.service');
const { successResponse, errorResponse } = require('../utils/response');
const { emailVerificacion } = require("../nodemailer/message");

// Registro

const registrarPasante = async (req, res) => {
    const { nombre, contrasena, correo, especialidad, direccion, estadoAcademico } = req.body;

    const existe = await prisma.usuario.findUnique({ where: { correo } });

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    
    const usuario = await crearUsuario(nombre, correo, hashedPassword, 3);

    emailVerificacion(correo, usuario.token);

    const nuevoPasante = await crearPasante(especialidad, direccion, estadoAcademico, usuario.id);

    return successResponse(res, nuevoPasante, 201);
};


const registrarEmpresa = async (req, res) => {
    const { nombre, correo, contrasena, direccion, telefono, especialidad } = req.body;

    const existe = await prisma.usuario.findUnique({ where: { correo } });
    if (existe) return res.status(400).json({ mensaje: 'Ya existe una cuenta con ese correo' });

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const usuario = await crearUsuario(nombre, correo, hashedPassword, 5);

    emailVerificacion(correo, usuario.token);

    const nuevaEmpresa = await crearEmpresa(direccion, telefono, especialidad, usuario.id)

    return successResponse(res, nuevaEmpresa, 201);
};

// Login
const login = async (req, res) => {
    const { correo, contrasena } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { correo } });
    if (!usuario) return res.status(400).json({ mensaje: 'Correo no registrado' });

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const tokenAccess = await generarAccessToken(usuario);
    const tokenRefresh = await generarRefreshToken(usuario);

    return res.json({
        user: {
            id: usuario.id,
            username: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        },
        tokenAccess,
        tokenRefresh
    });
};

const refresh = async (req, res) => {
    const { tokenRefresh } = req.body;

    const token = jwt.verify(tokenRefresh, secretKey);

    const user = await prisma.usuario.findFirst({ where: { id: token.id } })

    const tokenAccess = await generarAccessToken(user);

    return res.status(200).json({ tokenAccess });
}

const verificador = async (req, res) => {
    const cuenta = await verificarCuenta(req.params.email ,req.params.token)

    return successResponse(res, cuenta, 200);
}

module.exports = { 
    registrarPasante, 
    registrarEmpresa, 
    login, 
    refresh,
    verificador
};