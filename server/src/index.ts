import express from 'express';
import http, { IncomingMessage } from 'http';
import * as WebSocket from 'ws';
import cors from 'cors';

import { api } from './api';
import { addRoom, getRoom, IRoom } from './services/rooms';

const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());
app.use(api);

webSocketServer.on('connection', (connection: WebSocket, req: IncomingMessage) => {
  const roomId: string = req.url?.split('/')[1] || '';
  const room: IRoom | undefined = getRoom(roomId);

  if (!room) {
    addRoom(roomId);
  } else {
    console.log('found a room!!!');
  }

  // client.set(connection, req.url);

  // connection.on('message', (rawData: RawData) => {
  //   const data = JSON.parse(rawData.toString());
  //
  //   if ( data.type === 'connection' ) {
  //     client.forEach((value, key) => {
  //       if ( key !== connection && value === req.url ) {
  //         return key.send(JSON.stringify(data));
  //       }
  //     });
  //   }
  //
  //   if ( data.type === 'canvasLine' || data.type === 'canvasReset' ) {
  //     client.forEach((value, key) => {
  //       if ( key !== connection && value === req.url ) {
  //         key.send(JSON.stringify(data));
  //       }
  //     });
  //   }
  //
  //   if ( data.type === 'textArea' ) {
  //     client.forEach((value, key) => {
  //       if ( key !== connection && value === req.url ) {
  //         key.send(JSON.stringify(data));
  //       }
  //     });
  //   }
  // });
});

server.listen(3001, () => {
  console.log('Server started on port 3001');
});
