const http = require('http');
const { WebSocketServer } = require('ws');

const server = http.createServer();
server.listen(3001);

const wss = new WebSocketServer({ server });

// const clients = new Map();

wss.on('connection', (ws, m) => {
  // console.log('hello');
  // clients.set(ws, Date.now());
  // wss.clients.forEach((c) => {
  //   c.send(Date.now().toString());
  // });
  ws.on('message', (d) => {
    wss.clients.forEach((c) => {
      c.send(d.toString());
    })
  });
});