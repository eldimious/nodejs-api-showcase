const { httpPort } = require('./configuration');
const logger = require('./libs/logger');
const db = require('./db');
db.connector.connect();
const interfaces = require('./interfaces')(db);
const services = require('./services')(interfaces);
const app = require('./domain/app')(services);

const server = app.listen(httpPort, () => {
  logger.info(`Listening on *:${httpPort}`);
});
