'use strict';
/**
  * This module is used to collect all the configuration variables,
  * like the environment vars, in one place so they are not scattered all over the whole codebase
*/
const config = {
  dbConnectionString: process.env.DATABASE_URL,
  port: process.env.PORT || 5555,
  tokens: {
    instagram: {
      tokenKey: process.env.INSTAGRAM_TOKEN,
    },
    twitter: {
      tokenKey: process.env.TWITTER_TOKEN,
      tokenSecret: process.env.TWITTER_TOKEN_SECRET,
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    },
  },
};

module.exports = config;
