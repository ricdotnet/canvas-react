import './Canvas.css';
import { useEffect, useRef, useState } from 'react';
import { Color } from '../Color/Color';

// const ws = new WebSocket('ws://localhost:3001');

interface ILocation {
  x: number;
  y: number;
}

export function Canvas() {
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

  // ws.onopen = () => {
  // const userId = Date.now();
  // ws.send(userId.toString());
  // };
  // ws.onmessage! = (e) => {
  // const newUsers = [...users, e.data];
  // setUsers(newUsers);
  // console.log(JSON.parse(e.data));
  //   drawOther(JSON.parse(e.data));
  // };

  const setStart = (e: any) => {
    const bb = canvasData!.getBoundingClientRect();
    setLocation({ x: e.clientX - bb.x, y: e.clientY - bb.y });
    setIsMouseClicked(true);
  };

  const draw = (e: any) => {
    if (isMouseClicked) {
      const bb = canvasData!.getBoundingClientRect();
      const cLoc = { x: e.clientX - bb.x, y: e.clientY - bb.y };
      contextData!.beginPath();
      contextData!.lineWidth = 5;
      contextData!.lineCap = 'round';
      contextData!.lineJoin = 'miter';
      contextData!.strokeStyle = color;
      contextData!.moveTo(cLoc.x, cLoc.y);
      // contextData!.quadraticCurveTo(cLoc.x, cLoc.y, location.x, location.y);
      // contextData!.bezierCurveTo(cLoc.x, cLoc.y, location.x, location.y, location.x, location.y);
      contextData!.lineTo(location.x, location.y);
      contextData!.stroke();
      setStart(e);
    }
  };

  // const sendStart = () => {
  //   const drawDataStart = {
  //     ket: 'start',
  //     user: user,
  //     color: color,
  //     moveTo: {
  //       x: location.x,
  //       y: location.y,
  //     },
  //   };
  //   ws.send(JSON.stringify(drawDataStart));
  // }
  // const sendEnd = () => {
  //   const drawDataEnd = {
  //     key: 'end',
  //     user: user,
  //     color: color,
  //     lineTo: {
  //       x: location.x,
  //       y: location.y,
  //     },
  //   };
  //   ws.send(JSON.stringify(drawDataEnd));
  // }

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

  const reset = () => {
    contextData!.clearRect(0, 0, canvasData!.width, canvasData!.height);
  };

  const handleColorSelect = (color: string) => {
    setColor(color);
  };

  return (
    <div className="container">
      <div className="color-row">
        <Color color="red" selected={color === 'red'} onClick={() => handleColorSelect('red')} />
        <Color
          color="green"
          selected={color === 'green'}
          onClick={() => handleColorSelect('green')}
        />
        <Color color="blue" selected={color === 'blue'} onClick={() => handleColorSelect('blue')} />
        <Color
          color="yellow"
          selected={color === '#f5dd42'}
          onClick={() => handleColorSelect('#f5dd42')}
        />
        <Color
          color="purple"
          selected={color === 'purple'}
          onClick={() => handleColorSelect('purple')}
        />
        <button className="reset-button" onClick={() => reset()}>Reset</button>
      </div>
      <canvas
        ref={myRef}
        className="drawing-area"
        onMouseMove={(e) => draw(e)}
        onMouseDown={(e) => setStart(e)}
        onMouseUp={() => setIsMouseClicked(false)}
      />
    </div>
  );
}
