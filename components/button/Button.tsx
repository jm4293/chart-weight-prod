'use client';

interface IProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  text?: string;
  color?: 'white' | 'blue' | 'red';
  disabled?: boolean;
}

const colorClassMap: Record<string, string> = {
  blue: 'bg-blue-500 text-white',
  red: 'bg-red-500 text-white',
  white: 'bg-white text-black',
};

export const Button = (props: IProps) => {
  const {
    type = 'button',
    className,
    onClick,
    text = '확인',
    color = 'white',
    disabled,
  } = props;

  return (
    <button
      type={type}
      className={`text-2xl p-3 rounded border ${colorClassMap[color]} ${className}`}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  );
};
