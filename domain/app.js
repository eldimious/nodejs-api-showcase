require('express-jsend');
const express = require('express');
const compress = require('compression')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const expressValidator = require('express-validator');
const helmet = require('helmet');
const EndpointValidator = require('../middlewares/endpointValidator');
const authRouter = require('./routes/auth');
const tweetsRouter = require('./routes/tweets');
const errorRoute = require('./routes/errors');
const { jwtSecret } = require('../configuration');
const expressJwt = require('express-jwt');

const endpointValidator = new EndpointValidator();
const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(compress);
app.use(logger('dev'));
app.use(expressValidator(endpointValidator.settings));

module.exports = (services) => {
  const tweetsRoutes = tweetsRouter.init(services);
  const authRoutes = authRouter.init(services);

  app.use('/auth', authRoutes);
  app.use('/tweets', expressJwt({ secret: jwtSecret }), tweetsRoutes);

  app.use(errorRoute);

  return app;
};
