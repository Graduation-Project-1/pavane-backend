const {createLogger,transports,format} = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });
const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'logs/info.log',
            level: 'info',
            format: combine(
                timestamp(),
                myFormat,
                format.json(),
            ),
        }),
    ]
})

module.exports = logger;