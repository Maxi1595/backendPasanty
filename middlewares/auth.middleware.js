const jwt = require('jsonwebtoken');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const verificarToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ mensaje: "no se envio un token" });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensaje: "No tiene autorizacion para esto" });
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
                return res.status(403).json({ mensaje: "No esta autorizado para hacer esta accion"});
            }
        }
    }

    module.exports = {
        verificarToken,
        verificarRol
    };