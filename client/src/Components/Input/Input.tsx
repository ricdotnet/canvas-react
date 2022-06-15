import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import './Input.scss';

interface InputProps {
  value?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  onInputChange?: (value: string) => void;
}

export function Input(props: InputProps) {
  // const [value, setValue] = useState('');

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // setValue(event.target.value);
    return props.onInputChange!(event.target.value);
  };

  return (
    <input className="input-element"
           type={props.type || 'text'}
           placeholder={props.placeholder}
           onChange={onInputChange}/>
  );
}
