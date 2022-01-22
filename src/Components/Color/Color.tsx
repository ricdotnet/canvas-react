import './Color.css';

interface IColorProps {
  color: string;
  selected: boolean;
  onClick: () => void;
}

export function Color({ color, selected, onClick }: IColorProps) {

  return <div className={`button ${color} ${selected === true ? 'selected' : ''}`} onClick={onClick}></div>;
}
