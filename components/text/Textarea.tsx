'use client';

import { TextareaHTMLAttributes, useRef } from 'react';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  name?: string;
  placeholder?: string;
  color?: 'gray' | 'green';
  optional?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const borderColor = {
  gray: 'border border-gray-300',
  green: 'border border-green-400',
};

export const Textarea = (props: IProps) => {
  const {
    title,
    onChange,
    name = '',
    placeholder = '',
    color = 'gray',
    optional = false,
    className,
    ...rest
  } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    onChange?.(event);
  };

  return (
    <textarea
      id={name}
      name={name}
      ref={textareaRef}
      className={`border-theme-txt-gray  min-h-[20vh] max-h-[40vh] ${borderColor[color]} ${className}`}
      onChange={handleInput}
      placeholder={`${optional ? '[선택] ' : ''}${placeholder}`}
      {...rest}
    />
  );
};
