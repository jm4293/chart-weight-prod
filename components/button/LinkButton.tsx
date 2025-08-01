import Link from 'next/link';

interface IProps {
  className?: string;
  href: string;
  text: string;
}

const WHITE = (props: IProps) => {
  const { className, href, text } = props;

  return (
    <Link
      href={href}
      className={`text-2xl text-center p-3 rounded border bg-white text-black ${className}`}>
      {text}
    </Link>
  );
};

const GRAY = (props: IProps) => {
  const { className, href, text } = props;

  return (
    <Link
      href={href}
      className={`text-2xl text-center p-3 rounded bg-gray-300 text-black ${className}`}>
      {text}
    </Link>
  );
};

const BLUE = (props: IProps) => {
  const { className, href, text } = props;

  return (
    <Link
      href={href}
      className={`text-2xl text-center p-3 rounded border bg-blue-500 text-white ${className}`}>
      {text}
    </Link>
  );
};

const RED = (props: IProps) => {
  const { className, href, text } = props;

  return (
    <Link
      href={href}
      className={`text-2xl text-center p-3 rounded border bg-red-500 text-white ${className}`}>
      {text}
    </Link>
  );
};

export const LinkButton = {
  WHITE,
  GRAY,
  BLUE,
  RED,
};
