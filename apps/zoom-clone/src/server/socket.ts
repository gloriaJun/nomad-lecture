import http from 'node:http';

import socketIo from 'socket.io';

export function createSocket(server: http.Server) {
  const io = new socketIo.Server(server);

  io.on('connection', (socket) => {
    console.log('🤗 Client connected', socket);

    socket.on('message', (message) => {
      io.emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('😢 Client Disconnected!!');
    });
  });

  return io;
}
