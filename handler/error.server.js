const AppError = require("./app.error");

class InternalServerError  extends AppError {
    constructor(message = "Error en el servidor"){
        super(message, 500, "INTERNAL_SERVER_ERROR");
    }
}

module.exports = InternalServerError;