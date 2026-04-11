const AppError = require("../handler/app.error");

const errorHandler = (err, req, res, next) => {
    console.error(err)
    
    if (err instanceof AppError){
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
    
    next();
}

module.exports = errorHandler;