'use strict';
/**
  * This module is used to collect all the configuration variables,
  * like the environment vars, in one place so they are not scattered all over the whole codebase
*/
const config = {
  dbConnectionString: process.env.DATABASE_URL,
  httpPort: process.env.HTTP_PORT || 5555,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
