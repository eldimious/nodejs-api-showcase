'use strict';

const mongoose = require('mongoose');
const { dbConnectionString } = require('../configuration');

mongoose.Promise = require('bluebird');

const options = { promiseLibrary: require('bluebird') };
mongoose.connect(dbConnectionString, options);

const User = require('./entities/User')(mongoose);

const db = mongoose.connection;
// Check for error on connecting to Mongo DB
db.on('error', (err) => {
  console.log(`Error! DB Connection failed. Error: ${err}`);
  console.log('-----------------');
  return err;
});

// Connection open with No Problems
db.on('open', () => {
  console.log('DB Connection open!');
  console.log('-------------------');
});

module.exports = {
  User,
};
