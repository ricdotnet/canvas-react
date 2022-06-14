import './Canvas.scss';
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
  onChange?: (v: any) => void;
  onReset?: () => void;
  other?: any;
}

export function Canvas(props?: IProps) {
  const [isMouseClicked, setIsMouseClicked] = useState<boolean>(false);
  const [location, setLocation] = useState<ILocation>({ x: 0, y: 0 });
  const [color, setColor] = useState('red');
  const [imageData, setImageData] = useState<ImageData>();
  const [canvasData, setCanvasData] = useState<HTMLCanvasElement>();
  const [contextData, setContextData] = useState<CanvasRenderingContext2D>();
  const [previousData, setPreviousData] = useState<ImageData[]>([]);

  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    x: Number(window.outerWidth.toPrecision()),
    y: Number(window.outerHeight.toPrecision()),
  });

  window.addEventListener('resetEvent', () => {
    console.log('did reset....');
    reset();
  });

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    canvas.height = canvasSize.y;
    canvas.width = canvasSize.x;
    const context = canvas.getContext('2d');
    context!.createImageData(canvasSize.x, canvasSize.y);

    setCanvasData(canvas);
    setContextData(context!);
  }, []);

  // window.addEventListener('resize', () => {
  //   // const data = contextData!.getImageData(0, 0, window.innerWidth, window.innerHeight);
  //   canvasData!.width = window.innerWidth;
  //   canvasData!.height = window.innerHeight;
  //
  //   contextData!.putImageData(imageData!, 0, 0);
  // });
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
  };

  const mouseUp = () => {
    setIsMouseClicked(false);
    setImageData(contextData!.getImageData(0, 0, window.innerWidth, window.innerHeight));
    savePreviousData();
  };

  const savePreviousData = () => {
    if (imageData !== undefined) {
      previousData.push(imageData!);
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

      if (props && props!.onChange) {
        props?.onChange({
          type: 'canvasLine',
          lineWidth: contextData!.lineWidth,
          lineCap: contextData!.lineCap,
          lineJoin: contextData!.lineJoin,
          strokeStyle: contextData!.strokeStyle,
          moveTo: {
            x: cLoc.x,
            y: cLoc.y,
          },
          lineTo: {
            x: location.x,
            y: location.y,
          },
        });
      }
    }
  };

  const drawOther = () => {
    // if (data.user !== user) {
    if (props && props!.other) {
      const other = props!.other;
      contextData!.beginPath();
      contextData!.lineWidth = other.lineWidth;
      contextData!.lineCap = other.lineCap;
      contextData!.strokeStyle = other.strokeStyle;
      contextData!.moveTo(other.moveTo.x, other.moveTo.y);
      contextData!.lineTo(other.lineTo.x, other.lineTo.y);
      contextData!.stroke();
    }
  };
  drawOther();

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
        ref={canvasRef}
        className="drawing-area"
        onPointerDown={(e) => mouseDown(e)}
        onPointerMove={(e) => draw(e)}
        onPointerUp={mouseUp}
      />
    </div>
  );
}
