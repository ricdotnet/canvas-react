import { useParams } from 'react-router-dom';
import { Canvas } from '../Canvas/Canvas';
import './room.scss';
import { useState } from 'react';

// const webSocket = new WebSocket(`ws://localhost:3001/someId`);
let websocket: WebSocket;
function connectWebsocket(endpoint: string) {
  if (!websocket) {
    websocket = new WebSocket(`ws://localhost:3001/${endpoint}`);
  }
}

export function Room() {
  const { roomId } = useParams();
  const user = Date.now();

  const [otherData, setOtherData] = useState();
  const [textContent, setTextContent] = useState('');
  connectWebsocket(roomId!);

  const sendWsEvent = (e: any) => {
    const msg = {
      type: 'textarea',
      message: e.target.value,
    };
    websocket.send(JSON.stringify(msg));
    setTextContent(msg.message);
  };

  setTimeout(() => {
    websocket.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      // console.log(data);
      // setTextContent(data.message);
      setOtherData(data);
    };
  }, 3000);

  const handleCanvasUpdate = (v: any) => {
    const toSend = JSON.stringify(v);
    websocket.send(toSend);
  };

  return (
    <div>
      <Canvas onChange={(v: any) => handleCanvasUpdate(v)} other={otherData} />
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
