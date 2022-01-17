/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import cluster from 'cluster';
import os from 'os';
import logging from '../../logging';

/**
 * Setup number of worker processes to share port which will be defined while setting up server
 */
export const setupWorkerProcesses = () => {
  // to read number of cores on system
  const numCores = os.cpus().length;
  const workers: any = [];
  logging.info(`Master cluster setting up ${numCores} workers`);

  // iterate on number of cores need to be utilized by an application
  // current example will utilize all of them
  for (let i = 0; i < numCores; i++) {
    // creating workers and pushing reference in an array
    // these references can be used to receive messages from workers
    workers.push(cluster.fork());
    // to receive messages from worker process
    workers[i].on('message', (message: string) => logging.info(`worker message: ${message}`));
  }
  // process is clustered on a core and process id is assigned
  cluster.on('online', (worker) => logging.info(`Worker ${worker.process.pid} is online`));
  cluster.on('listening', (worker) => logging.info(`Worker ${worker.process.pid} is listening`));
  // if any of the worker process dies then start a new one by simply forking another one
  cluster.on('exit', (worker, code, signal) => {
    logging.info(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
    // if condition above to make sure the worker process actually crashed and was not manually disconnected or killed by the master process itself.
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      logging.info('Starting a new worker');
      const newWorker = cluster.fork();
      workers.push(newWorker);
      // to receive messages from new worker process
      workers[workers.length - 1].on('message', (message: string) => logging.info(`worker message: ${message}`));
    }
  });
};
