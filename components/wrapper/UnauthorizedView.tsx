import Link from 'next/link';
import { Wrapper } from './Wrapper';
import { Text } from '../text';
import { ChevronRight } from 'lucide-react';

interface IProps {
  text: string;
}

export const UnauthorizedView = (props: IProps) => {
  const { text } = props;

  return (
    <Wrapper.MAIN text={text}>
      <Wrapper.SECTION text="로그인이 필요합니다.">
        <Link href="/login" className="flex justify-between">
          <Text.HEADING text="로그인 페이지로 이동" />
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
};
