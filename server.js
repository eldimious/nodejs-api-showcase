const cluster = require('cluster');
const {
  httpPort,
  dbConnectionString,
} = require('./configuration');

const setupWorkerProcesses = require('./common/utils/workerProcesses');
const logging = require('./common/logging');
const signals = require('./signals');
const db = require('./data/infrastructure/db')({ dbConnectionString });
db.connector.connect();
const repositories = require('./data/repositories')(db);
const services = require('./domain')(repositories);
const app = require('./router/app')(services);
let server;

((isClusterRequired) => {
  // if it is a master process then call setting up worker process
  if (isClusterRequired && cluster.isMaster) {
    setupWorkerProcesses();
  } else {
    // to setup server configurations and share port address for incoming requests
    server = app.listen(httpPort, () => {
      logging.info(`Listening on *:${httpPort}`);
    });
  }
})(true);

const shutdown = signals.init(async () => {
  await db.connector.close();
  await server.close();
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
