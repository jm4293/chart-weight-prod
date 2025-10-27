import { InputHTMLAttributes } from 'react';
import { Text } from '../text';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  className?: string;
}

export const Input = (props: IProps) => {
  const { title, className, ...rest } = props;

  return (
    <div className="flex flex-col gap-1">
      {title && <Text.HEADING text={title} />}
      <input
        className={`border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...rest}
      />
    </div>
  );
};
