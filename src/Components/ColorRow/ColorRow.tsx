import { useState } from 'react';
import { Button } from '../Button/Button';
import { Color } from '../Color/Color';
import './ColorRow.scss';

interface IColorRow {
  onColorChange: (color: string) => void;
  onReset: () => void;
}

export function ColorRow(props: IColorRow) {
  const [color, setColor] = useState('red');

  const reset = () => {
    props.onReset();
  };

  const handleColorSelect = (color: string) => {
    props.onColorChange(color);
    setColor(color);
  };

  return (
    <div className="color-row">
      <Color color="red" selected={color === 'red'} onClick={() => handleColorSelect('red')}/>
      <Color
        color="green"
        selected={color === 'green'}
        onClick={() => handleColorSelect('green')}
      />
      <Color color="blue" selected={color === 'blue'} onClick={() => handleColorSelect('blue')}/>
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
      {/* <button className="reset-button" onClick={() => reset()}>
            Reset
            </button> */}
      <Button label="Reset" onClick={reset}></Button>
    </div>
  );
}
