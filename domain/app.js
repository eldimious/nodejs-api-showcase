require('express-jsend');
const express = require('express');
const compress = require('compression')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const expressValidator = require('express-validator');
const helmet = require('helmet');
const EndpointValidator = require('../middlewares/endpointValidator');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const errorRoute = require('./routes/errors');
const authentication = require('../middlewares/authentication');

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
  const usersRoutes = usersRouter.init(services);
  const authRoutes = authRouter.init(services);

  app.use('/auth', authRoutes);
  app.use('/data', authentication, usersRoutes);

  app.use(errorRoute);

  return app;
};
