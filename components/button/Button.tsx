interface IProps {
  className?: string;
  onClick?: () => void;
  text?: string;
  color?: 'white' | 'blue' | 'red';
  disabled?: boolean;
}

export const Button = (props: IProps) => {
  const {
    className,
    onClick,
    text = '확인',
    color = 'white',
    disabled,
  } = props;

  return (
    <button
      className={`text-2xl p-3 rounded border ${
        color === 'blue'
          ? 'bg-blue-500 text-white'
          : color === 'red'
            ? 'bg-red-500 text-white'
            : 'bg-white text-black'
      } ${className}`}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  );
};
