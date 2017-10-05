'use strict';
/**
  * This module is used to collect all the configuration variables,
  * like the environment vars, in one place so they are not scattered all over the whole codebase
*/
const config = {
  dbConnectionString: process.env.DATABASE_URL,
  port: process.env.PORT || 5555,
};

module.exports = config;
