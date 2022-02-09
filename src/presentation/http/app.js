const http = require('http');
const express = require('express');
const cors = require('cors');
const compress = require('compression')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const { errorHandler } = require('@dimosbotsaris/express-error-handler');
const jwt = require('express-jwt');
const authRoutes = require('./routes/auth/routes');
const usersRoutes = require('./routes/users/routes');
const swaggerDocument = require('../../swagger');
const {
  jwtSecret,
} = require('../../configuration');

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(compress);
app.use(logger('dev'));
app.use(cors());

module.exports.init = (services) => {
  app.use(express.static(path.join(__dirname, 'public')));
  // swagger API docs
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true,
  }));
  app.use(jwt({
    secret: jwtSecret,
    algorithms: ['HS256'],
  })
    .unless({
      path: ['/auth/register', '/auth/login'],
    }));
  app.use('/auth', authRoutes.init(services));
  app.use('/users', usersRoutes.init(services));
  app.use(errorHandler({ trace: true }));
  const httpServer = http.createServer(app);
  return httpServer;
};
