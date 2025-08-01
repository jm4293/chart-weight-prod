'use client';

interface IProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

const WHITE = (props: IProps) => {
  const { className, type = 'button', text = '확인', ...rest } = props;

  return (
    <button
      type={type}
      className={`text-2xl p-3 border rounded bg-white text-black ${className}`}
      {...rest}>
      {text}
    </button>
  );
};

const GRAY = (props: IProps) => {
  const { className, type = 'button', text = '확인', ...rest } = props;

  return (
    <button
      type={type}
      className={`text-2xl p-3 rounded bg-gray-300 text-black ${className}`}
      {...rest}>
      {text}
    </button>
  );
};

const BLUE = (props: IProps) => {
  const { className, type = 'button', text = '확인', ...rest } = props;

  return (
    <button
      type={type}
      className={`text-2xl p-3 rounded bg-blue-500 text-white ${className}`}
      {...rest}>
      {text}
    </button>
  );
};

const RED = (props: IProps) => {
  const { className, type = 'button', text = '확인', ...rest } = props;

  return (
    <button
      type={type}
      className={`text-2xl p-3 rounded bg-red-500 text-white ${className}`}
      {...rest}>
      {text}
    </button>
  );
};

const YELLOW = (props: IProps) => {
  const { className, type = 'button', text = '확인', ...rest } = props;

  return (
    <button
      type={type}
      className={`text-2xl p-3 rounded bg-yellow-300 text-black ${className}`}
      {...rest}>
      {text}
    </button>
  );
};

export const Button = { WHITE, GRAY, BLUE, RED, YELLOW };
