import './Paint.css';
import { useEffect, useRef, useState } from 'react';

const ws = new WebSocket('ws://localhost:3001');

interface ILocation {
  x: number;
  y: number;
}

export function Paint() {
  const [isMouseClicked, setIsMouseClicked] = useState<boolean>(false);
  const [startLocation, setStartLocation] = useState<ILocation>({
    x: 0,
    y: 0,
  });
  const [location, setLocation] = useState<ILocation>({
    x: 0,
    y: 0,
  });
  const [color, setColor] = useState('red');

  const [user, setUser] = useState('');

  const myRef = useRef(null);
  const [canvasData, setCanvasData] = useState<HTMLCanvasElement>();
  const [contextData, setContextData] = useState<CanvasRenderingContext2D>();
  useEffect(() => {
    const canvas: HTMLCanvasElement = myRef.current!;
    canvas.height = 500;
    canvas.width = 500;
    const context = canvas.getContext('2d');
    context!.createImageData(500, 500);

    setCanvasData(canvas);
    setContextData(context!);

    setUser(Date.now().toString());
  }, []);

  ws.onopen = () => {
    // const userId = Date.now();
    // ws.send(userId.toString());
  };
  ws.onmessage! = (e) => {
    // const newUsers = [...users, e.data];
    // setUsers(newUsers);
    // console.log(JSON.parse(e.data));
    drawOther(JSON.parse(e.data));
  };

  const setStart = (e: any) => {
    const bb = canvasData!.getBoundingClientRect();
    setLocation({ x: e.clientX - bb.x, y: e.clientY - bb.y });
    setIsMouseClicked(true);
  };

  const draw = (e: any) => {
    if (isMouseClicked) {
      contextData!.beginPath();
      contextData!.lineWidth = 5;
      contextData!.lineCap = 'round';
      contextData!.strokeStyle = color;
      const drawDataStart = {
        ket: 'start',
        user: user,
        color: color,
        moveTo: {
          x: location.x,
          y: location.y,
        },
      };
      ws.send(JSON.stringify(drawDataStart));
      contextData!.moveTo(location.x, location.y);
      contextData!.lineTo(location.x, location.y);
      contextData!.stroke();
      setStart(e);
      const drawDataEnd = {
        key: 'end',
        user: user,
        color: color,
        lineTo: {
          x: location.x,
          y: location.y,
        },
      };
      ws.send(JSON.stringify(drawDataEnd));
    }
  };

  const drawOther = (data: any) => {
    if (data.user !== user) {
      contextData!.beginPath();
      contextData!.lineWidth = 5;
      contextData!.lineCap = 'round';
      contextData!.strokeStyle = data.color;

      if (data.moveTo) {
        contextData!.moveTo(data.moveTo.x, data.moveTo.y);
      }
      if (data.lineTo) {
        contextData!.lineTo(data.lineTo.x, data.lineTo.y);
      }
      contextData!.stroke();
    }
  };

  return (
    <div className="container">
      <canvas
        ref={myRef}
        className="drawing-area"
        onMouseMove={(e) => draw(e)}
        onMouseDown={(e) => setStart(e)}
        onMouseUp={() => setIsMouseClicked(false)}
      />
      <div>
        <button onClick={() => setColor('red')}>Red</button>
        <button onClick={() => setColor('green')}>Green</button>
        <button onClick={() => setColor('blue')}>Blue</button>
      </div>
    </div>
  );
}
