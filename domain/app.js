const express = require('express');
const cors = require('cors');
const compress = require('compression')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const expressValidator = require('express-validator');
const helmet = require('helmet');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const expressJwt = require('express-jwt');
const EndpointValidator = require('../middleware/endpointValidator');
const authenticateEndpoint = require('../middleware/authentication');
const authRoutes = require('./routes/auth');
const tweetsRoutes = require('./routes/tweets');
const usersRoutes = require('./routes/users');
const errorRoute = require('./routes/errors');
const {
  jwtSecret,
} = require('../configuration');
const swaggerDocument = require('../swagger');

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
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true,
  }));
  app.use('/auth', authRoutes.init(services));
  app.all('*', authenticateEndpoint, expressJwt({ secret: jwtSecret }), (req, res, next) => {
    next();
  });
  app.use('/tweets', tweetsRoutes.init(services));
  app.use('/users', usersRoutes.init(services));
  app.use(errorRoute);

  return app;
};
