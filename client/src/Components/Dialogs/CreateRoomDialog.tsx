import { useEffect, useState } from 'react';
import { DialogComponent } from './DialogComponent';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import axios from 'axios';
import { MessageComponent } from '../Message/MessageComponent';

interface ICreateRoomDialog {
  showDialog: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateRoomDialog(props: ICreateRoomDialog) {
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [showDialog, setShowDialog] = useState<boolean>();

  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setShowDialog(props.showDialog);
  }, [props.showDialog]);

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
    return props.onClose();
  };

  return (
    (!showDialog) ? null :
      <DialogComponent title="Create a New Room">
        <Input placeholder="Room name" onInputChange={setRoomName}/>
        <Input placeholder="Your username" onInputChange={setUsername}/>
        <Input placeholder="Room password (not mandatory)" onInputChange={setPassword}/>

        <div className="dialog-full__buttons">
          {(!creatingRoom) ?
            <>
              <Button label="Cancel" onClick={onCreateRoomCancel}/>
              <Button label="Submit" onClick={onCreateRoomSubmit}/>
            </>
            : <>Creating Room</>}
        </div>
      </DialogComponent>
  );
}
