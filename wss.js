const http = require('http');
const { WebSocketServer } = require('ws');

const server = http.createServer();
server.listen(3001, () => {
  console.log('Socket server is running.');
});

const wss = new WebSocketServer({ server });

const clients = new Map();

wss.on('connection', (ws) => {
  console.log('A client connected!');

  ws.on('hello', () => {
    console.log('jhgdbdsv');
  });

  ws.on('message', (m) => {
    // const data = JSON.parse(m.toString());
    // if (!clients.get(ws)) {
    //   clients.set(data.ws, data.user);
    // }
    // // console.log(m.toString());
    // // wss.clients.forEach(ws => {
    // //   ws.send(m.toString());
    // // })
    // console.log(clients.get(data.ws));

  });
  // ws.on('paint', () => {
  //   console.log('painting')
  // });
});

// wss.on('message', (wss, m) => {
//   console.log(m);
// });
