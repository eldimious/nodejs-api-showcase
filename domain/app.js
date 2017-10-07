const express = require('express');
const cookieParser = require('cookie-parser');
const compress = require('compression')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const usersRouter = require('./routes/users');
const picturesRouter = require('./routes/pictures');
const socialNetworksRouter = require('./routes/socialNetworks');
const errorRoute = require('./routes/errors');

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(compress);
app.use(logger('dev'));


module.exports = (services) => {
  const usersRoutes = usersRouter.init(services);
  const picturesRoutes = picturesRouter.init(services);
  const socialNetworksRoutes = socialNetworksRouter.init(services);

  app.use('/users', usersRoutes);

  app.use('/pictures', picturesRoutes);

  app.use('/socialNetworks', socialNetworksRoutes);

  app.use(errorRoute);

  return app;
};
