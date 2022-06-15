import { ReactNode } from 'react';
import './DialogComponent.scss';

interface IDialogComponent {
  title: string;
  children: ReactNode | ReactNode[];
}

export function DialogComponent(props: IDialogComponent) {

  return (
    <div className="dialog-full">
      <div className="dialog-full__dialog">
        <div className="dialog-full__dialog_title">{props.title}</div>
        {props.children}
      </div>
    </div>
  );
}
