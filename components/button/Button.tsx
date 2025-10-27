'use client';

import { ButtonHTMLAttributes } from 'react';
import { Text } from '../text';

type ButtonVariant = 'white' | 'gray' | 'blue' | 'red' | 'yellow';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
  color?: ButtonVariant;
}

const colorStyles: Record<ButtonVariant, string> = {
  white: 'p-2 border rounded bg-white text-black',
  gray: 'p-2 rounded bg-gray-300 text-black',
  blue: 'p-2 rounded bg-blue-500 text-white',
  red: 'p-2 rounded bg-red-500 text-white',
  yellow: 'p-2 rounded bg-yellow-300 text-black',
};

export const Button = (props: IProps) => {
  const { className = '', text = '확인', color = 'white', ...rest } = props;

  return (
    <button className={`w-full ${colorStyles[color]} ${className}`} {...rest}>
      <Text.HEADING text={text} />
    </button>
  );
};
