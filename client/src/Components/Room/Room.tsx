import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
  const [username, setUsername] = useState('');

  const { roomId } = useParams();
  const { state }: any = useLocation();

  useEffect(() => {
    // setUsername(localStorage.getItem('username')!);
    // axios.get(`http://localhost:3001/room/${roomId}`)
    //   .then((res) => {
    //     // console.log(res.data);
    //     connectWebsocket(roomId!);
    //     setLoadingRoom(false);
    //     setRoom(res.data);
    //   })
    //   .catch((error) => {
    //     console.error(error.response);
    //     setLoadingRoom(false);
    //   });
    if ( state && state.username ) {
      setUsername(state.username);
      connectWebsocket(roomId!);
      setLoadingRoom(false);
    } else {
      setLoadingRoom(false);
    }
  }, []);

  if ( websocket ) {
    websocket.onopen = () => {
      websocket.send(
        JSON.stringify({
          type: 'connection',
          username,
        })
      );
    };
    websocket.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      setOtherData(data);

      if ( data.type === 'canvasReset' ) {
        return dispatchEvent(resetEvent);
      }
    };
  }

  const handleCanvasUpdate = (v: any) => {
    let data = Object.assign(v, { username });
    const toSend = JSON.stringify(data);
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
        : (!loadingRoom && !username) ? 'this room does not exist...'
          : <Canvas
            onChange={(v: any) => handleCanvasUpdate(v)}
            other={otherData}
            onReset={handleCanvasReset}
          />}
    </div>
  );
}
