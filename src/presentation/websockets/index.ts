import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import logging from '../../common/logging';

function init(httpServer: HttpServer) {
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    socket.on('custom-event', (value) => {
      io.emit('custom-event', value);
    });
    socket.on('disconnect', () => {
      logging.info('user disconnected');
    });
  });
};

export default {
  init,
};
