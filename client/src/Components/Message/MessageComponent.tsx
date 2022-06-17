import './MessageComponent.scss';
import '../../index.scss';

interface IMessageComponent {
  message: string;
  showMessage: boolean;
}

export function MessageComponent(props: IMessageComponent) {
  return (
    (!props.showMessage) ? null :
      <div className="message" style={{ transition: 'ease-in-out 5s' }}>{props.message}</div>
  );
}
