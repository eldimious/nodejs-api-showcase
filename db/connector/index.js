/*  Mongoose connection module. */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const logger = require('../../libs/logger');
const { dbConnectionString } = require('../../configuration');

const options = {
  useMongoClient: true,
  promiseLibrary: require('bluebird'),
};

module.exports = {
  connect() {
    // Open Connection to Mongo DB
    mongoose.connect(dbConnectionString, { useMongoClient: true });

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

    return mongoose.connection;
  },
  close() {
    return mongoose.connection.close();
  },
};
