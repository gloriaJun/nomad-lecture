## Chat With WebSocket

### Http vs WebSocket

- http
  - **stateless**
  - backend와 사용자 사이에 아무런 연결이 없으므로 backend는 사용자를 기억하지 못한다.
    - 요청에 대해 처리하고 잊어버린다. 단지, server는 요청에 대해 응답하고 끝!!
  - real-time으로 응답과 요청이 발생하지 않는다.
- websocket
  - **bi-directional connection**
  - 브라우저로부터 connection이 발생하면 handshake를 하는 것과 같이 동작한다.
  - connection이 되어있으므로 서버는 사용자가 누구인지 기억하고, 원할 때 언제든 사용자에게 메시지를 보낼 수 있다.
  - real-time으로 연결이 끊길 때까지 연결되어있다.

### Usage

#### server

```typescript
import http from 'http';

// ...SKIP

const server = app.listen(PORT, () => {
  console.log(`\n🚀 Listening on 'http://localhost:${PORT}'`);
});

/**
 * create a WebSocket server
 */
const ws = new WebSocket.Server({ server });

ws.on('connection', (socket) => {
  console.log('🤗 Client connected');
  socket.send('👋 Hello!');

  socket.on('close', () => {
    console.log('😢 Disconnected from Browser');
  });

  socket.on('message', (message) => {
    console.log('📨 Message received from client:', message.toString('utf-8'));

    // ws.clients.forEach((client) => {
    //   if (client !== socket && client.readyState === WebSocket.OPEN) {
    //     client.send(message);
    //   }
    // });
  });
});
```

#### client

```typescript
const socket = new WebSocket(`ws://${window.location.host}`);
console.log('This is a TypeScript client script', socket);

socket.addEventListener('open', () => {
  console.log('🤗 Connect to server');
  socket.send('👋 Hello!');
});

socket.addEventListener('message', (message) => {
  console.log('📨 Message received from server:', message.data);
});

socket.addEventListener('close', () => {
  console.log('😢 Disconnected from server');
});
```
