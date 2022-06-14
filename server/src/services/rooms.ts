import * as WebSocket from 'ws';

interface IRoom {
  name: string;
  owner: string;
  users: Map<string, WebSocket>;
  password?: string;
}

const client = new Map<string, WebSocket>();
const rooms: IRoom[] = [];

function addRoom(roomId: string) {
  console.log('added a new room', roomId);
}

function getRoom(roomId: string): IRoom | undefined {
  return rooms.find(r => r.name === roomId);
}

export {
  IRoom,
  addRoom,
  getRoom
};
