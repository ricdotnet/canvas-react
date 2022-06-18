import { IncomingMessage } from "http";
import * as WebSocket from "ws";
import { IRoom, getRoom } from "../services/rooms";

let websocketServer: WebSocket.Server;

function initWebsocketServer(server: any) {
  websocketServer = new WebSocket.Server({ server });

  websocketServer.on('connection', onConnect);
//  websocketServer.on('message', onMessage);
}

function getWebsocketServer(): WebSocket.Server {
  return websocketServer;
}

function onConnect(connection: WebSocket, request: IncomingMessage) {
  const roomId: string = request.url?.split('/')[1] || '';
  const room: IRoom | undefined = getRoom(roomId);

  connection.on('message', (rawData: WebSocket.RawData) => onMessage(connection, rawData, request));
}

function onMessage(connection: WebSocket, rawData: WebSocket.RawData, request: IncomingMessage) {
    const data = JSON.parse(rawData.toString());
    const roomId = request.url!.substring(1);
    const room = getRoom(roomId);

    if ( data.type === 'connection' ) {
      room?.users.set(data.username, connection);
      console.log(room?.users.size);
    }

    if ( data.type === 'canvasLine' ) {
      room?.users.forEach((value, key) => {
        if ( key !== data.username ) {
          value.send(JSON.stringify(data));
        }
      });
    }
}

export {
  initWebsocketServer,
  getWebsocketServer,
  onConnect,
  onMessage,
}
