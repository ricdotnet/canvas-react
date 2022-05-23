import './Canvas.css';
import { useEffect, useRef, useState } from 'react';
import { ColorRow } from '../ColorRow/ColorRow';

// const ws = new WebSocket('ws://148.251.49.251:10000');
interface ILocation {
  x: number;
  y: number;
}

interface IProps {
  room?: string;
  ws?: WebSocket;
  user?: number;
}

export function Canvas(props?: IProps) {
  const [isMouseClicked, setIsMouseClicked] = useState<boolean>(false);
  const [location, setLocation] = useState<ILocation>({ x: 0, y: 0 });
  const [color, setColor] = useState('red');
  // const [user, setUser] = useState('');
  const [imageData, setImageData] = useState<ImageData>();
  const [canvasData, setCanvasData] = useState<HTMLCanvasElement>();
  const [contextData, setContextData] = useState<CanvasRenderingContext2D>();
  const [previousData, setPreviousData] = useState<ImageData[]>([]);
  const [keysPressed, setKeysPressed] = useState({ z: false, control: false });
  const [prop, setProp] = useState(props!);
  const [roomId, setRoomId] = useState(prop.room);

  const myRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  useEffect(() => {
    const canvas: HTMLCanvasElement = myRef.current!;
    canvas.height = canvasSize.y;
    canvas.width = canvasSize.x;
    const context = canvas.getContext('2d');
    context!.createImageData(canvasSize.x, canvasSize.y);

    setCanvasData(canvas);
    setContextData(context!);

    // setUser(Date.now().toString());
  }, []);

  // ws.onopen = () => {
  //   const userId = Date.now();
  //   ws.send(userId.toString());
  // };
  if (prop.ws) {
    prop.ws.onmessage! = (e: any) => {
      // const newUsers = [...users, e.data];
      // setUsers(newUsers);
      // console.log(JSON.parse(e.data));
      drawOther(JSON.parse(e.data));
      // console.log(e.data);
    };
  }

  window.addEventListener('resize', () => {
    // const data = contextData!.getImageData(0, 0, window.innerWidth, window.innerHeight);
    canvasData!.width = window.innerWidth;
    canvasData!.height = window.innerHeight;

    contextData!.putImageData(imageData!, 0, 0);
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'u') {
      undo();
    }
  });

  const setStart = (e: any) => {
    // const bb = canvasData!.getBoundingClientRect();
    setLocation({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const mouseDown = (e: any) => {
    setIsMouseClicked(true);
    setLocation({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

    // TODO: This throws an error of invalid type for ImageData when resetting or when starting.
    // Solution: using an array to store only 1 object of ImageData everytime and restore if length===1 is true.
    // contextData!.putImageData(imageData!, 0, 0);
    // contextData!.beginPath();
    // contextData!.lineWidth = 5;
    // contextData!.lineCap = 'round';
    // contextData!.lineJoin = 'miter';
    // contextData!.strokeStyle = color;
    // contextData!.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    // contextData!.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    // contextData!.stroke();
  };

  const mouseUp = () => {
    setIsMouseClicked(false);
    setImageData(contextData!.getImageData(0, 0, window.innerWidth, window.innerHeight));
    savePreviousData();
  };

  const savePreviousData = () => {
    if (imageData !== undefined) {
      previousData.push(imageData!);
      // console.log(imageData);
      setPreviousData(previousData);
    }
  };
  const undo = () => {
    if (previousData.length > 0) {
      const last: ImageData = previousData[previousData.length - 1];
      contextData!.putImageData(last, 0, 0);
      previousData.pop();
      return;
    }
    // }
  };

  const draw = (e: any) => {
    if (isMouseClicked) {
      const cLoc = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
      // sendStart(cLoc.x, cLoc.y);
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
      // sendEnd();
      setStart(e);
      sendStart(location.x, location.y);
    }
  };

  const sendStart = (x: number, y: number) => {
    if (prop.room) {
      const drawDataStart = {
        key: 'start',
        user: prop.user,
        color: color,
        moveTo: {
          x: x,
          y: y,
        },
      };
      prop.ws!.send(JSON.stringify(drawDataStart));
    }
  };
  const sendEnd = () => {
    if (prop.room) {
      const drawDataEnd = {
        key: 'end',
        user: prop.user,
        color: color,
        lineTo: {
          x: location.x,
          y: location.y,
        },
      };
      prop.ws!.send(JSON.stringify(drawDataEnd));
    }
  };

  const drawOther = (data: any) => {
    // if (data.user !== user) {
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
    // }
  };

  const reset = () => {
    setImageData(null!);
    contextData!.clearRect(0, 0, canvasData!.width, canvasData!.height);
  };

  const handleColorSelect = (color: string) => {
    setColor(color);
  };

  return (
    <div>
      <ColorRow onColorChange={handleColorSelect} onReset={reset} />
      <canvas
        ref={myRef}
        className="drawing-area"
        onPointerDown={(e) => mouseDown(e)}
        onPointerMove={(e) => draw(e)}
        onPointerUp={mouseUp}
      />
    </div>
  );
}
