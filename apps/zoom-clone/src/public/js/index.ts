const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');

const socket = new WebSocket(`ws://${window.location.host}`);
console.log('This is a TypeScript client script', socket);

socket.addEventListener('open', () => {
  console.log('🤗 Connect to server');
});

socket.addEventListener('message', (message) => {
  console.log('📨 Message received from server:', message.data);
});

socket.addEventListener('close', () => {
  console.log('😢 Disconnected from server');
});

messageForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const messageInput = document.querySelector('input');

  if (messageInput?.value) {
    socket.send(messageInput?.value);
  }

  messageInput!.value = '';
});
