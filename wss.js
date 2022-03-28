const http = require('http');
const { WebSocketServer } = require('ws');

// const server = http.createServer();
// server.listen(10001, () => {
//   console.log('Socket server is running.');
// });

const wss = new WebSocketServer({
  port: 10001,
  perMessageDeflate: false,
});

const clients = new Map();

wss.on('connection', (connection, req) => {
  console.log('A client connected!');
  clients.set(connection, req.url);

  connection.on('message', (rawData) => {
    const data = JSON.parse(rawData.toString());

    if (data.type === 'canvasLine') {
      clients.forEach((value, key) => {
        if (key !== connection && value === req.url) {
          key.send(JSON.stringify(data));
        }
      });
    }
  });
});
