const AppError = require ('../handler/app.error');

class UnauthorizedError extends AppError {
    constructor(message = "No tiene autorizacion para esto"){
        super(message, 401, "UNAUTHORIZED_ERROR");
    }
}

module.exports = UnauthorizedError;