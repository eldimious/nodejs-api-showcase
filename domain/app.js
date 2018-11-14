const express = require('express');
const cors = require('cors');
const compress = require('compression')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const expressValidator = require('express-validator');
const helmet = require('helmet');
const EndpointValidator = require('../middleware/endpointValidator');
const authenticateEndpoint = require('../middleware/authentication');
const authRoutes = require('./routes/auth');
const tweetsRoutes = require('./routes/tweets');
const usersRoutes = require('./routes/users');
const errorRoute = require('./routes/errors');
const {
  jwtSecret,
} = require('../configuration');
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
app.use(cors());

module.exports = (services) => {
  app.use('/auth', authRoutes.init(services));
  app.use('/tweets', authenticateEndpoint, expressJwt({ secret: jwtSecret }), tweetsRoutes.init(services));
  app.use('/users', authenticateEndpoint, expressJwt({ secret: jwtSecret }), usersRoutes.init(services));
  app.use(errorRoute);

  return app;
};
