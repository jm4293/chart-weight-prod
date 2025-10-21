'use client';

import { ButtonHTMLAttributes } from 'react';
import { Text } from '../text';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
}

const WHITE = (props: IProps) => {
  const { className, text = '확인', ...rest } = props;

  return (
    <button
      className={`p-2 border rounded bg-white text-black ${className}`}
      {...rest}>
      <Text.HEADING text={text} />
    </button>
  );
};

const GRAY = (props: IProps) => {
  const { className, text = '확인', ...rest } = props;

  return (
    <button
      className={`p-2 rounded bg-gray-300 text-black ${className}`}
      {...rest}>
      <Text.HEADING text={text} />
    </button>
  );
};

const BLUE = (props: IProps) => {
  const { className, text = '확인', ...rest } = props;

  return (
    <button
      className={`p-2 rounded bg-blue-500 text-white ${className}`}
      {...rest}>
      <Text.HEADING text={text} />
    </button>
  );
};

const RED = (props: IProps) => {
  const { className, text = '확인', ...rest } = props;

  return (
    <button
      className={`p-2 rounded bg-red-500 text-white ${className}`}
      {...rest}>
      <Text.HEADING text={text} />
    </button>
  );
};

const YELLOW = (props: IProps) => {
  const { className, text = '확인', ...rest } = props;

  return (
    <button
      className={`p-2 rounded bg-yellow-300 text-black ${className}`}
      {...rest}>
      <Text.HEADING text={text} />
    </button>
  );
};

export const Button = { WHITE, GRAY, BLUE, RED, YELLOW };
