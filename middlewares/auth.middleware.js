const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const UnauthorizedError = require("../handler/error.unauthorizederror");
const Forbidden = require("../handler/error.forbidden");
const { comprobarVerificacion } = require('../service/auth.service');

const verificarToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new Forbidden();
        }


        const decoded = jwt.verify(token, secretKey);
        console.log(decoded);

        await comprobarVerificacion(decoded.id);

        req.user = decoded;
        return next();

    } catch (error) {
        
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return next(new UnauthorizedError());
        }

        return next(error);
    }
};

function verificarRol(rol) {
    return async (req, res, next) => {
        const nivelRol = req.user?.rol;
        if (nivelRol == rol) { //se puede poner mayor o igual, por ahora permanece en igual
            return next();
        } else {
            next(new Forbidden());
        }
    }
}

module.exports = {
    verificarToken,
    verificarRol
};