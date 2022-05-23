import { useParams } from 'react-router-dom';
import { Canvas } from '../Canvas/Canvas';
import './room.scss';
import { useState } from 'react';

// const webSocket = new WebSocket(`ws://localhost:3001/someId`);
let websocket: WebSocket;
function connectWebsocket(endpoint: string) {
  if (!websocket) {
    websocket = new WebSocket(`wss://ws.unispaces.uk/${endpoint}`);
  }
}

const resetEvent = new Event('resetEvent');

export function Room() {
  const { roomId } = useParams();
  const user = Date.now();

  const [otherData, setOtherData] = useState();
  const [textContent, setTextContent] = useState('');
  connectWebsocket(roomId!);

  const sendWsEvent = (e: any) => {
    const msg = {
      type: 'textArea',
      message: e.target.value,
    };
    websocket.send(JSON.stringify(msg));
    setTextContent(msg.message);
  };

  websocket.onopen = () => {
    websocket.send(
      JSON.stringify({
        type: 'connection',
      })
    );
  };

  setTimeout(() => {
    websocket.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      console.log(data);
      setTextContent(data.message);

      if (data.type === 'canvasReset') {
        return dispatchEvent(resetEvent);
      }

      setOtherData(data);
      if (data.type === 'textArea') {
        setTextContent(data.message);
      }
    };
  }, 3000);

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
      <Canvas
        onChange={(v: any) => handleCanvasUpdate(v)}
        other={otherData}
        onReset={handleCanvasReset}
      />
      {/*<textarea*/}
      {/*  id={'textarea'}*/}
      {/*  rows={50}*/}
      {/*  className={'room__text_area'}*/}
      {/*  value={textContent}*/}
      {/*  onChange={sendWsEvent}*/}
      {/*/>*/}
    </div>
  );
}