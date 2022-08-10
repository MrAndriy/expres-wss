const express = require('express');
const app = express();
const WServer = require('express-ws')(app);
const aWss = new WServer.getWss();

const PORT = process.env.PORT || 3010;

app.ws('/', (ws, req) => {
  ws.send('hello from webSocket server');

  ws.on('message', (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case 'connection':
        connectionHandler(msg, ws);
        break;
      case 'message':
        console.log(msg);
        messageHandler(msg, ws);
        break;
      default:
        break;
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const connectionHandler = (msg, ws) => {
  ws.id = msg.id;
  BroadcastConnection(msg, ws);
};

const BroadcastConnection = (msg, ws) => {
  aWss.clients.forEach((client) => {
    if (client.id !== msg.id) {
      client.send(`${msg.username} has connected`);
    }
  });
};

const messageHandler = (msg, ws) => {
  aWss.clients.forEach((client) => {
    // if (client.id === msg.id) {
      //   client.send(`${msg.username} : ${msg.message}`);
      client.send(`${msg.username} : ${msg.message}`);
    // }
  });
};
