import winston from 'winston';
import expressWinston from 'express-winston';
import {
  PRODUCTION_ENV,
  VERBOSE_LOGGING_LVL,
  INFO_LOGGING_LVL,
} from '../constants';

const getTransports = () => {
  const transports = [
    new winston.transports.Console(),
  ];
  return transports;
};

const getFormat = () => winston.format.combine(
  winston.format.colorize(),
  winston.format.json(),
);

const requestLogger = expressWinston.logger({
  transports: getTransports(),
  format: getFormat(),
  colorize: true,
  expressFormat: true,
  meta: true,
});

const errorLogger = expressWinston.errorLogger({
  transports: getTransports(),
  format: getFormat(),
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV !== PRODUCTION_ENV ? VERBOSE_LOGGING_LVL : INFO_LOGGING_LVL,
  format: getFormat(),
  transports: getTransports(),
});

export = {
  raw: winston,
  requestLogger,
  errorLogger,
  error: logger.error.bind(logger),
  warn: logger.warn.bind(logger),
  info: logger.info.bind(logger),
  log: logger.log.bind(logger),
  verbose: logger.verbose.bind(logger),
  debug: logger.debug.bind(logger),
  silly: logger.silly.bind(logger),
};
