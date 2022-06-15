import * as WebSocket from 'ws';

interface IRoom {
  name: string;
  owner: string;
  users: Map<string, WebSocket>;
  password?: string;
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

export {
  IRoom,
  addRoom,
  getRoom,
  getRooms,
};
