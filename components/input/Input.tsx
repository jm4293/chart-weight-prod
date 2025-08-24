import { InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: 'text' | 'email' | 'password';
}

export const Input = (props: IProps) => {
  const { className, type = 'text', ...rest } = props;

  return (
    <input
      type={type}
      className={`border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...rest}
    />
  );
};
