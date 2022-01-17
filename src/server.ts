import cluster from 'cluster';
import config from './configuration';
import { setupWorkerProcesses } from './common/utils/workerProcesses';
import logging from './common/logging';
import signals from './signals';
import { Database } from './data/infrastructure/db';
import { postsRepositoryFactory } from './data/repositories/postsRepository';
import { usersRepositoryFactory } from './data/repositories/usersRepository';
import { authenticationRepositoryFactory } from './data/repositories/authenticationRepository';
import { recourceLimiterRepositoryFactory } from './data/repositories/recourceLimiterRepository';
import { authServiceFactory } from './domain/auth/service';
import { postsServiceFactory } from './domain/posts/service';
import { usersServiceFactory } from './domain/users/service';
import { appServerFactory } from './presentation/http/app';
import { appSocketsFactory } from './presentation/websockets';
import { IRepositories } from './common/interfaces/IRepositories';
import { IServices } from './common/interfaces/IServices';

const db = new Database(config.dbConnectionString as string);
const authenticationRepository = authenticationRepositoryFactory.init();
const postsRepository = postsRepositoryFactory.init();
const recourceLimiterRepository = recourceLimiterRepositoryFactory.init();
const usersRepository = usersRepositoryFactory.init();
const authService = authServiceFactory.init({
  authenticationRepository,
  usersRepository,
  recourceLimiterRepository,
} as IRepositories);
const postsService = postsServiceFactory.init({
  postsRepository,
} as IRepositories);
const usersService = usersServiceFactory.init({
  usersRepository,
  postsRepository,
} as IRepositories);
const app = appServerFactory.init({
  authService,
  postsService,
  usersService,
} as IServices);

appSocketsFactory.init(app);

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
