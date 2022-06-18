import express from 'express';
import http from 'http';
import cors from 'cors';

import { initWebsocketServer } from './services/websocket';

import { api } from './api';
import { addRoom } from './services/rooms';

const app = express();
const server = http.createServer(app);

initWebsocketServer(server);

app.use(cors());
app.use(express.json());
app.use(api);

server.listen(3001, '0.0.0.0', () => {
  console.log('Server started on port 3001');
  addRoom({
    roomId: 'test',
    owner: 'admin',
  });
});
