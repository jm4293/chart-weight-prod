import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Text } from './Text';

interface IProps {
  href: string;
  text: string;
}

export const LinkText = (props: IProps) => {
  const { href, text } = props;

  return (
    <Link href={href} className="flex justify-between">
      <Text.HEADING text={text} />
      <ChevronRight />
    </Link>
  );
};
