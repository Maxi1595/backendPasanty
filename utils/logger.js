const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const logLevels = {
    error: 0,
    warning: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const Logger = winston.createLogger({
    levels: logLevels,
    level: process.env.LOG_LEVEL || 'debug',
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp({
            format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        winston.format.printf(
            ({ timestamp, level, message, LogMetadata, stack }) => {
                return `${timestamp} ${level} ${LogMetadata || ""} ${message} ${stack || ""}`;
            },
        ),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'error.log', level: "error"}),
        new winston.transports.File({filename: 'combined.log'})
    ],
})

module.exports = Logger;