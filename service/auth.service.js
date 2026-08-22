const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config
const secretKey = process.env.SECRET_KEY;
const { PrismaClient } = require('@prisma/client');
const { PrismaSingleton } = require('../prisma/prisma.client');
const { BadRequest } = require("../handler/error.badrequest")

const generarAccessToken = async (usuario) => {
    const token = jwt.sign({
        username: usuario.correo, //borrar?
        id: usuario.id,
        rol: usuario.rol
    }, secretKey, { expiresIn: '30m' });

    return token;
}

const generarRefreshToken = async (tokenAnt) => {

    const tokenNuevo = jwt.sign({
        id: tokenAnt.id,
        //ahi que agregar un campo que sea para poder validar otro token mediante la BD
    }, secretKey, { expiresIn: '7d' }) //lo tengo que cambiar por 2 dias

    return tokenNuevo;
}

const generarVerificadoToken = async () => {
    const tokenString = crypto.randomBytes(32).toString('hex');

    return tokenString;
}

const crearUsuario = async (nombre, correo, contrasena, rol) => {
    const token = await generarVerificadoToken();

    const usuario = await PrismaSingleton.usuario.create({
        data: {
            nombre: nombre,
            correo: correo,
            contrasena: contrasena,
            rol: rol,
            token: token
        }
    })

    return usuario;
}

const verificarCuenta = async (email, token) => {
    const usuario = await PrismaSingleton.usuario.update({
        where: { 
            correo: email,
            token: token
         },
        data: { 
            verificado: true,
            token: null
        }
    })

    return usuario;
}

module.exports = { 
    generarAccessToken,
    generarRefreshToken,
    generarVerificadoToken,
    crearUsuario,
    verificarCuenta
}