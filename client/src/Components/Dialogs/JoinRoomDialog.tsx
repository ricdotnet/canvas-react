import { useEffect, useState } from 'react';
import { DialogComponent } from './DialogComponent';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import axios from 'axios';
import { MessageComponent } from '../Message/MessageComponent';
import { useNavigate } from 'react-router-dom';

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

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setShowDialog(props.showDialog);
  }, [props.showDialog]);

  const onJoinRoomSubmit = async () => {
    setJoiningRoom(true);
    let response;

    try {
      response = await axios.get(`http://localhost:3001/room/${roomName}`, {
        params: {
          password
        }
      });
      setShowDialog(false);
      localStorage.setItem('username', username);
      setJoiningRoom(false);
      navigate(`room/${roomName}`, {
        state: {
          username,
          password,
        }
      });
    } catch (error: any) {
      // console.error(error.response.data);
      setMessage(error.response.data.error);
      setShowMessage(true);
      setJoiningRoom(false);
      setTimeout(() => {
        setShowMessage(false);
        setMessage('');
      }, 5000);
    }
  };

  const onJoinRoomCancel = () => {
    return props.onClose();
  };

  return (
    <>
      {(!showDialog) ? null :
        <DialogComponent title="Join an Existing Room">
          <Input placeholder="Room name" onInputChange={setRoomName}/>
          <Input placeholder="Your username" onInputChange={setUsername}/>
          <Input placeholder="Room password (not mandatory)" onInputChange={setPassword}/>

          <MessageComponent showMessage={showMessage} message={message}/>

          <div className="dialog-full__buttons">
            {(!joiningRoom) ?
              <>
                <Button label="Cancel" onClick={onJoinRoomCancel}/>
                <Button label="Submit" onClick={onJoinRoomSubmit}/>
              </>
              : <>Joining Room</>}
          </div>
        </DialogComponent>}
    </>
  );
}
