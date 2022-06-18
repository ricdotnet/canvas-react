import { Request, Response, Router } from 'express';
import { addRoom, getRoom, IRoom } from '../services/rooms';

const api = Router();

api.get('/rooms', (req: Request, res: Response) => {
  res.send({ rooms: 'here I would send a list of rooms...' });
});

api.post('/room', (req: Request, res: Response) => {
  const { roomId, owner, password } = req.body;

  const room = getRoom(roomId);
  if ( room ) {
    return res.status(401).send({ error: 'A room with that name already exists.' });
  }

  if ( !roomId ) {
    return res.status(401).send({ error: 'A room name is mandatory.' });
  }

  if ( !owner ) {
    return res.status(401).send({ error: 'A username is mandatory.' });
  }

  addRoom({ roomId, owner, password });

  res.send({ response: 'Room added with success!' });
});

api.post('/room/:roomId', (req: Request, res: Response) => {
  const room: IRoom | undefined = getRoom(req.params['roomId']);

  if ( !room ) {
    return res.status(404).send({ error: 'Room not found.' });
  }

  if ( room.password !== req.body['password'] ) {
    return res.status(401).send({ error: 'The password is incorrect.' });
  }

  res.send({ message: 'Success.' });
});

export { api };
