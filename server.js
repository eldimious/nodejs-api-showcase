const {
  httpPort,
  dbConnectionString,
} = require('./configuration');
const logging = require('./common/logging');
const signals = require('./signals');
const db = require('./data/db')({ dbConnectionString });

db.connector.connect();
const repositories = require('./data')(db);
const services = require('./domain')(repositories);
const app = require('./router/app')(services);

const server = app.listen(httpPort, () => {
  logging.info(`Listening on *:${httpPort}`);
});

const shutdown = signals.init(async () => {
  await db.connector.close();
  await server.close();
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
