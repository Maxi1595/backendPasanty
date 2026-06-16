const AppError = require ('../handler/app.error');

class NotFound extends AppError {
    constructor(message = "Recurso solicitado no encontrado"){
        super(message, 404, "NOT_FOUND");
    }
}

module.exports = NotFound;