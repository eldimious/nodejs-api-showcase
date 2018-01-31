/*  Mongoose connection module. */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const logger = require('../../libs/logger');

module.exports = (dbConnectionString) => {
  if (!dbConnectionString) {
    throw new Error('add correct format of config with dbConnectionString');
  }
  const options = {
    useMongoClient: true,
    promiseLibrary: require('bluebird'),
  };

  // Check for errors on connecting to Mongo DB
  mongoose.connection.on('error', (err) => {
    logger.error(`Error! DB Connection failed. Error: ${err}`);
    return err;
  });

  // Connection opened successfully
  mongoose.connection.once('open', () => {
    logger.info('Connection to MongoDB established');
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('Connection to MongoDB closed');
    logger.info('-------------------');
  });

  return {
    getConnection() {
      return mongoose.connection;
    },

    connect() {
      // Open Connection to Mongo DB
      return mongoose.connect(dbConnectionString, options);
    },
    close() {
      return mongoose.connection.close();
    },
  };
};
