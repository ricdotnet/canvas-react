import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Canvas } from '../Canvas/Canvas';
import './room.scss';

// const webSocket = new WebSocket(`ws://localhost:3001/someId`);
let websocket: WebSocket;

function connectWebsocket(endpoint: string) {
  if ( !websocket ) {
    // websocket = new WebSocket(`wss://ws.unispaces.uk/${endpoint}`);
    websocket = new WebSocket(`ws://localhost:3001/${endpoint}`);
  }
}

const resetEvent = new Event('resetEvent');

export function Room() {
  const [loadingRoom, setLoadingRoom] = useState(true);
  const [room, setRoom] = useState(null);
  const [otherData, setOtherData] = useState();

  const { roomId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/room/${roomId}`)
      .then((res) => {
        console.log(res.data);
        connectWebsocket(roomId!);
        setLoadingRoom(false);
        setRoom(res.data);
      })
      .catch((error) => {
        console.error(error.response);
        setLoadingRoom(false);
      });
  }, []);

  if ( websocket ) {
    websocket.onopen = () => {
      websocket.send(
        JSON.stringify({
          type: 'connection',
        })
      );
    };
    websocket.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);

      if ( data.type === 'canvasReset' ) {
        return dispatchEvent(resetEvent);
      }
    };
  }

  const handleCanvasUpdate = (v: any) => {
    const toSend = JSON.stringify(v);
    websocket.send(toSend);
  };

  const handleCanvasReset = () => {
    websocket.send(
      JSON.stringify({
        type: 'canvasReset',
      })
    );
  };

  return (
    <div>
      {(loadingRoom) ? 'room is loading...'
        : (!loadingRoom && !room) ? 'this room does not exist...'
          : <Canvas
            onChange={(v: any) => handleCanvasUpdate(v)}
            other={otherData}
            onReset={handleCanvasReset}
          />}
    </div>
  );
}
