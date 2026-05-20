const AppError = require("../handler/app.error");
const PrismaErrores = require('../handler/prisma.error');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime/library');
const Logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    Logger.error(err)

    if (err instanceof PrismaClientKnownRequestError) {
        err = PrismaErrores(err);
    }

    if (err instanceof AppError) {
        return res.status(err.status).json({
            error: {
                code: err.code,
                message: err.message
            }
        });
    }

    res.status(500).json({
        error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Error interno del servidor'
        }
    });
}

module.exports = errorHandler;