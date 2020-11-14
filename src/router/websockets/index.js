const socketIO = require('socket.io');
const logging = require('../../common/logging');

function create(httpServer) {
  const io = socketIO(httpServer);

  io.sockets.on('connection', (socket) => {
    socket.on('custom-event', (value) => {
      io.emit('custom-event', value);
    });
    socket.on('disconnect', () => {
      logging.info('user disconnected');
    });
  });
}

module.exports = create;
