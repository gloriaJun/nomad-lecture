import express from 'express';
import WebSocket from 'ws';
import path from 'path';

const resolve = (file: string) => path.join(process.cwd(), 'dist', file);

const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'pug');
app.set('views', resolve('views'));
app.use('/public', express.static(resolve('public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

const server = app.listen(PORT, () => {
  console.log(`\n🚀 Listening on 'http://localhost:${PORT}'`);
});

/**
 * create a WebSocket server
 */
const ws = new WebSocket.Server({ server });

ws.on('connection', (socket) => {
  const sendMessageToClient = (message: string) => {
    ws.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  };

  console.log('🤗 Client connected');
  sendMessageToClient('👋 Hello! from new connected client');

  socket.on('message', (message) => {
    sendMessageToClient(message.toString('utf-8'));
  });

  socket.on('close', () => {
    console.log('😢 Client Disconnected!!');
    sendMessageToClient('😢 Bye! one client is disconnected!!');
  });
});
