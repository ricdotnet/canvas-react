import { Request, Response, Router } from 'express';

const api = Router();

api.get('/rooms', (req: Request, res: Response) => {
  res.send({ rooms: 'here I would send a list of rooms...' });
});

api.post('/room', (req: Request, res: Response) => {
  console.log(req.body);
  res.send({ rooms: 'here we will create rooms...' });
});

api.get('/room/:roomId', (req: Request, res: Response) => {
  console.log(req.params['roomId']);
  res.send();
});

export { api };
