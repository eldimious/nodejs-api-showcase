import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import logging from '../../common/logging';

export const appSocketsFactory = {
  init(httpServer: HttpServer) {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
      socket.on('custom-event', (value) => {
        io.emit('custom-event', value);
      });
      socket.on('disconnect', () => {
        logging.info('user disconnected');
      });
    });
  },
};
