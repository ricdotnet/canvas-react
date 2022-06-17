import * as WebSocket from 'ws';

interface IRoom {
  name: string;
  owner: string;
  users: Map<string, WebSocket>;
  password?: string;
}

interface IClient {
  username: string;
  connection: WebSocket;
}

const client = new Map<string, WebSocket>();
const rooms: IRoom[] = [];

function addRoom(room: any) {
  rooms.push({
    name: room.roomId,
    owner: room.owner,
    users: new Map<string, WebSocket>(),
    password: room.password || '',
  });
}

function getRoom(roomId: string): IRoom | undefined {
  return rooms.find(r => r.name === roomId);
}

function getRooms() {
  return rooms;
}

function addClient(roomId: string, client: IClient) {
  const room: IRoom | undefined = getRoom(roomId);

  room?.users.set(client.username, client.connection);
}

function removeClient(roomId: string, connection: WebSocket) {
  const room: IRoom | undefined = getRoom(roomId);

  // remove user from here...
}

export {
  IRoom,
  IClient,
  addRoom,
  getRoom,
  getRooms,
};
