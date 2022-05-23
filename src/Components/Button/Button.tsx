import './Button.css'

interface IButtonProps {
    label: string;
    onClick?: () => void;
}

export function Button(props: IButtonProps) {

    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    }

    return (
        <button className='reset-button' onClick={handleClick}>{props.label}</button>
    )
}