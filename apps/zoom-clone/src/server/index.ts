import express from 'express';
import WebSocket from 'ws';
import path from 'path';
import { MessageData } from '~/@types';

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
  const sendMessageToClient = (message: MessageData) => {
    ws.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            ...message,
            // @ts-ignore
            nickname: socket.nickname,
          }),
        );
      }
    });
  };

  console.log('🤗 Client connected');
  sendMessageToClient({
    type: 'join',
    payload: '👋 Hello! from new connected client',
  });

  socket.on('message', (message) => {
    const { type, payload } = JSON.parse(
      message.toString('utf-8'),
    ) as MessageData;

    switch (type) {
      case 'nickname':
        // @ts-ignore
        socket[type] = payload;
        break;
      default:
        sendMessageToClient({
          type: 'message',
          payload,
        });
    }
  });

  socket.on('close', () => {
    console.log('😢 Client Disconnected!!');
    sendMessageToClient({
      type: 'leave',
      payload: '😢 Bye! one client is disconnected!!',
    });
  });
});
