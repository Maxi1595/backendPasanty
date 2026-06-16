class AppError extends Error {
    constructor(message, status, code) {
        super(message)
        this.status = status;
        this.code = code;
        this.name = this.constructor.name;
        this.isOperative = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;