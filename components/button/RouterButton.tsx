'use client';

import { useRouter } from 'next/navigation';

interface IProps {
  className?: string;
  text: string;
  routerPath: string;
}

export const RouterButton = (props: IProps) => {
  const { className, text, routerPath } = props;

  const router = useRouter();

  const handleClick = () => {
    router.push(routerPath);
  };

  return (
    <button
      className={`text-2xl p-3 rounded border bg-blue-500 text-white ${className}`}
      onClick={handleClick}>
      {text}
    </button>
  );
};
