interface IMessageComponent {
  message: string;
}

export function MessageComponent(props: IMessageComponent) {

  return (
    <div className="message">{props.message}</div>
  );
}
