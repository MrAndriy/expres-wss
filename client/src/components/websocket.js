import React from 'react';

const WebsocketComp = () => {
    const socket = new WebSocket('ws://localhost:3010/');

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          message: 'hello from webSocket client',
          method: 'connection',
          time: new Date().toLocaleString(),
          id: Math.random() * 100,
          username: ` user ${Math.floor(Math.random() * 100)}`,
        })
      );
    };

    socket.onmessage = (event) => {
      console.log(`message from sever `, event.data);
    };

    const sendMessage = (msg) => {
      socket.send(
        JSON.stringify({
          message: 'hello from webSocket client',
          method: 'message',
          time: new Date().toLocaleString(),
          id: Math.random() * 100,
          username: 'user1',
        })
      );
    };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default WebsocketComp;
