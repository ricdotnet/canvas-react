import './Color.scss';

interface IColorProps {
  color: string;
  selected: boolean;
  onClick: () => void;
}

export function Color({ color, selected, onClick }: IColorProps) {

  return <div className={`button ${color} ${selected ? 'button__selected' : ''}`} onClick={onClick}/>;
}
