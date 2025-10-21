import { JSX } from 'react';

import { Text } from '@/components/text';

interface IProps {
  id?: string;
  text?: string | JSX.Element;
  children?: React.ReactNode;
}

const MAIN = (props: IProps) => {
  const { text, children } = props;

  return (
    <section className="flex flex-col gap-4">
      {typeof text === 'string' ? <Text.TITLE text={text} /> : text}
      {children}
    </section>
  );
};

const SECTION = (props: IProps) => {
  const { id, text, children } = props;

  return (
    <section
      key={id}
      className="flex flex-col justify-center gap-4 p-4 rounded-lg bg-[#fdfdfd]">
      {typeof text === 'string' ? <Text.SUBTITLE text={text} /> : text}
      {children}
    </section>
  );
};

export const Wrapper = {
  MAIN,
  SECTION,
};
