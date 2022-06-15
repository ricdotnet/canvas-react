import { useEffect, useState } from 'react';
import { DialogComponent } from './DialogComponent';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

interface ICreateRoomDialog {
  showDialog: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function JoinRoomDialog(props: ICreateRoomDialog) {
  const [joiningRoom, setJoiningRoom] = useState(false);
  const [showDialog, setShowDialog] = useState<boolean>();

  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setShowDialog(props.showDialog);
  }, [props.showDialog]);

  const onJoinRoomSubmit = async () => {
    setJoiningRoom(true);
    // const response = await axios.post('http://localhost:3001/room', {
    //   roomId: roomName,
    //   owner: username,
    //   password,
    // });
    setJoiningRoom(false);
  };

  const onJoinRoomCancel = () => {
    return props.onClose();
  };

  return (
    (!showDialog) ? null :
      <DialogComponent title="Join an Existing Room">
        <Input placeholder="Room name" onInputChange={setRoomName}/>
        <Input placeholder="Your username" onInputChange={setUsername}/>
        <Input placeholder="Room password (not mandatory)" onInputChange={setPassword}/>

        <div className="dialog-full__buttons">
          {(!joiningRoom) ?
            <>
              <Button label="Cancel" onClick={onJoinRoomCancel}/>
              <Button label="Submit" onClick={onJoinRoomSubmit}/>
            </>
            : <>Joining Room</>}
        </div>
      </DialogComponent>
  );
}
