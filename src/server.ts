import cluster from 'cluster';
import { Server } from 'http';
import config from './configuration';
import { setupWorkerProcesses } from './common/utils/workerProcesses';
import logging from './common/logging';
import signals from './signals';
import { Database } from './data/infrastructure/db';
import postsRepositoryContainer from './data/repositories/postsRepository';
import usersRepositoryContainer from './data/repositories/usersRepository';
import authenticationRepositoryContainer from './data/repositories/authenticationRepository';
import { init as recourceLimiterRepositoryContainer} from './data/repositories/recourceLimiterRepository';
import authServiceContainer from './domain/auth/service';
import postsServiceContainer from './domain/posts/service';
import usersServiceContainer from './domain/users/service';
import appContainer from './presentation/http/app';
import websocketsContainer from './presentation/websockets';
import { IRepositories } from './common/interfaces/IRepositories';
import { IServices } from './common/interfaces/IServices';

const db = new Database(config.dbConnectionString as string);
const authenticationRepository = authenticationRepositoryContainer.init();
const postsRepository = postsRepositoryContainer.init();
const usersRepository = usersRepositoryContainer.init();
const recourceLimiterRepository = recourceLimiterRepositoryContainer();
const authService = authServiceContainer.init({
  authenticationRepository,
  usersRepository,
  recourceLimiterRepository,
} as IRepositories);
const postsService = postsServiceContainer.init({
  postsRepository,
} as IRepositories);
const usersService = usersServiceContainer.init({
  usersRepository,
  postsRepository,
} as IRepositories);
const app: Server = appContainer.init({
  authService,
  postsService,
  usersService,
} as IServices);

websocketsContainer.init(app);

let server: any;

((isClusterRequired) => {
  // if it is a master process then call setting up worker process
  if (isClusterRequired && cluster.isPrimary) {
    setupWorkerProcesses();
  } else {
    // to setup server configurations and share port address for incoming requests
    server = app.listen(config.httpPort, () => {
      logging.info(`Listening on *:${config.httpPort}`);
    });
  }
})(true);

const shutdown = signals.init(async () => {
  await db.close();
  await server.close();
});

(async () => {
  try {
    await db.connect();
  } catch (error) {
    await shutdown();
  }
})();

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
