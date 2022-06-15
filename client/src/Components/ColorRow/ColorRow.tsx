import { useState } from 'react';
import { Button } from '../Button/Button';
import { Color } from '../Color/Color';
import './ColorRow.scss';
import { CreateRoomDialog } from '../Dialogs/CreateRoomDialog';
import { JoinRoomDialog } from '../Dialogs/JoinRoomDialog';

interface IColorRow {
  onColorChange: (color: string) => void;
  onReset: () => void;
}

export function ColorRow(props: IColorRow) {
  const [color, setColor] = useState('red');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);

  const reset = () => {
    props.onReset();
  };

  const handleColorSelect = (color: string) => {
    props.onColorChange(color);
    setColor(color);
  };

  const onCreateRoomClick = () => {
    setShowCreateDialog(true);
  };

  const onCreateRoomClose = () => {
    setShowCreateDialog(false);
  };

  const onCreateRoomSuccess = () => {
  };

  const onJoinRoomClick = () => {
    setShowJoinDialog(true);
  };

  const onJoinRoomClose = () => {
    setShowJoinDialog(false);
  };

  const onJoinRoomSuccess = () => {
  };

  return (
    <div className="color-row">
      <div>
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
        <Button label="Reset" onClick={reset}></Button>
      </div>
      <div>
        <Button label="Join Room" onClick={onJoinRoomClick}/>
        <Button label="Create Room" onClick={onCreateRoomClick}/>
      </div>
      <CreateRoomDialog
        showDialog={showCreateDialog}
        onClose={onCreateRoomClose}
        onSuccess={onCreateRoomSuccess}/>
      <JoinRoomDialog
        showDialog={showJoinDialog}
        onClose={onJoinRoomClose}
        onSuccess={onJoinRoomSuccess}/>
    </div>
  );
}
