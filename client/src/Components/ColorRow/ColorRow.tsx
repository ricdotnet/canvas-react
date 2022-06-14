import { useState } from 'react';
import { Button } from '../Button/Button';
import { Color } from '../Color/Color';
import axios from 'axios';
import './ColorRow.scss';

interface IColorRow {
  onColorChange: (color: string) => void;
  onReset: () => void;
}

export function ColorRow(props: IColorRow) {
  const [color, setColor] = useState('red');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [creatingRoom, setCreatingRoom] = useState(false);

  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const reset = () => {
    props.onReset();
  };

  const handleColorSelect = (color: string) => {
    props.onColorChange(color);
    setColor(color);
  };

  const onClickCreateRoom = () => {
    setShowCreateDialog(true);
  };

  const onCreateRoomSubmit = async () => {
    setCreatingRoom(true);
    const response = await axios.post('http://localhost:3001/room', {
      roomId: roomName,
      owner: username,
      password,
    });
    setCreatingRoom(false);
    console.log(response.data);
  };

  const onCreateRoomCancel = () => {
    setShowCreateDialog(false);
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
        {/* <button className="reset-button" onClick={() => reset()}>
            Reset
            </button> */}
        <Button label="Reset" onClick={reset}></Button>
      </div>
      <div>
        <Button label={creatingRoom ? 'Creating.....' : 'Create Room'}
                onClick={onClickCreateRoom}></Button>
      </div>
      {(!showCreateDialog) ? null :
        <div className="create-room-full">
          <div className="create-room-full__dialog">
            <input type="text" className="input" placeholder="Room name"
                   onChange={(v) => setRoomName(v.target.value)}/>
            <input type="text" className="input" placeholder="Your username"
                   onChange={(v) => setUsername(v.target.value)}/>
            <input type="text" className="input" placeholder="Enter a password (not mandatory)"
                   onChange={(v) => setPassword(v.target.value)}/>

            <div className="create-room-full__buttons">
              {(!creatingRoom) ?
                <>
                  <Button label="Cancel" onClick={onCreateRoomCancel}/>
                  <Button label="Submit" onClick={onCreateRoomSubmit}/>
                </>
                : <>Creating Room</>}
            </div>
          </div>
        </div>
      }
    </div>
  );
}
