const BadRequest = require("./error.badrequest");
const NotFound = require("./error.notfound");
const InternalServerError = require("./error.server");

const PrismaErrores = (error) => {
    switch(error.code){
        case "P2025":
            return new NotFound;
        case "P2002":
            return new BadRequest;
        case "P2003":
            return new NotFound;
        default: 
            return new InternalServerError;
    }
}

module.exports = PrismaErrores;