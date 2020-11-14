const winston = require('winston');
const expressWinston = require('express-winston');

const { Logger } = winston;


const getTransports = () => {
  const transports = [
    new winston.transports.Console({
      colorize: true,
    }),
  ];
  return transports;
};


const requestLogger = expressWinston.logger({
  level: 'info',
  transports: getTransports(),
  colorize: false,
  expressFormat: true,
  meta: true,
});


const errorLogger = expressWinston.errorLogger({
  level: 'error',
  transports: getTransports(),
});


const logger = new Logger({
  level: process.env.NODE_ENV !== 'production' ? 'verbose' : 'info',
  transports: getTransports(),
});


module.exports = {
  requestLogger,
  errorLogger,
  error: logger.error,
  warn: logger.warn,
  info: logger.info,
  log: logger.log,
  verbose: logger.verbose,
  debug: logger.debug,
  silly: logger.silly,
};
