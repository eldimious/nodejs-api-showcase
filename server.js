const {
  httpPort,
  dbConnectionString,
} = require('./configuration');
const logging = require('./common/logging');
const signals = require('./signals');
const db = require('./db')({ dbConnectionString });

db.connector.connect();
const interfaces = require('./interfaces')(db);
const services = require('./services')(interfaces);
const app = require('./domain/app')(services);

const server = app.listen(httpPort, () => {
  logging.info(`Listening on *:${httpPort}`);
});

const shutdown = signals.init(async () => {
  await db.connector.close();
  await server.close();
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
