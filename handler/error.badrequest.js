const AppError = require("./app.error");

class BadRequest extends AppError {
    constructor(message = "Datos inválidos en la solicitud"){
        super(message, 400, "BAD_REQUEST");
    }
}

module.exports = BadRequest;