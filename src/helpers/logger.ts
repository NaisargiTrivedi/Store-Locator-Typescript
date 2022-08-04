import { createLogger, format, transports, Logger } from 'winston';
// import { combine, timestamp, printf } from format;

const myFormat = format.printf(({ level, message, timestamp }): string => {
    return `${timestamp} [${level}] : ${message}`;
});

const logger: Logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console()
    ],
});

export default logger;