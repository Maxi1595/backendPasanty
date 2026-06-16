const AppError = require("../handler/app.error");

class Forbidden extends AppError {
    constructor (message = "Problemas verificando su token"){
        super(message, 403, "FOBIDDEN");
    }
}

module.exports = Forbidden;