import { useParams } from 'react-router-dom';
import { Canvas } from '../Canvas/Canvas';

const ws = new WebSocket('ws://localhost:3001');

export function Room() {
  const { roomId } = useParams();
  const user = Date.now();

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        type: 'connection',
        user: user,
        room: roomId,
      })
    );
  };

  return (
    <>
      <Canvas room={roomId} ws={ws} user={user} />
    </>
  );
}
