import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export function JoinRoomDialog(props: ICreateRoomDialog) {
  const [joiningRoom, setJoiningRoom] = useState(false);
  const [showDialog, setShowDialog] = useState<boolean>();

  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  let timer: any = null;
  const [clearMessageT, setClearMessageT] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    setShowDialog(props.showDialog);

    return function cleanup() {
      clearTimeout(timer);
    };
  }, [props.showDialog]);

  // TODO: All this logic should not be in this component maybe
  const onJoinRoomSubmit = async () => {
    clearTimeout(clearMessageT);
    setJoiningRoom(true);
    let response;

    try {
      response = await axios.post(`http://localhost:3001/room/${roomName}`, {
        username,
        password,
      });
      setJoiningRoom(false);
      setShowDialog(false);
      localStorage.setItem('username', username);
      props.onSuccess();
      navigate(`room/${roomName}`, {
        state: {
          username,
          password,
        }
      });
    } catch (error: any) {
      setMessage(error.response.data.error);
      setShowMessage(true);
      setJoiningRoom(false);
      timer = setTimeout(() => {
        setShowMessage(false);
        setMessage('');
      }, 5000);
      setClearMessageT(timer);
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
