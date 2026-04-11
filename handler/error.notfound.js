const AppError = require ('../handler/app.error');

class notFound extends AppError {
    constructor(message = "Recurso solicitado no encontrado"){
        super(message, 404, "NOT_FOUND");
    }
}

module.exports = notFound;