const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config
const secretKey = process.env.SECRET_KEY;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

const crearUsuario = async (nombre, correo, contrasena, rol) => {
    const usuario = await prisma.usuario.create({
        data: {
            nombre: nombre,
            correo: correo,
            contrasena: contrasena,
            rol: rol
        }
    })

    return usuario;
}

module.exports = { 
    generarAccessToken,
    generarRefreshToken,
    crearUsuario
}