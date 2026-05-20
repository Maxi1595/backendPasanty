const jwt = require('jsonwebtoken');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const UnauthorizedError = require("../handler/error.unauthorizederror");
const Forbidden = require("../handler/error.forbidden");

const verificarToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        throw new Fobidden();
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            next(new UnauthorizedError());
        } else {
            req.user = decoded;
            next();
        }
    });
};

    function verificarRol (rol) {
        return async (req, res, next) => {
            const nivelRol = req.user?.rol;
            if(nivelRol == rol){ //se puede poner mayor o igual, por ahora permanece en igual
                return next();
            } else {
                next(new Fobidden());
            }
        }
    }

    module.exports = {
        verificarToken,
        verificarRol
    };