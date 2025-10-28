import Link from 'next/link';
import { Wrapper } from './Wrapper';
import { Text } from '../text';
import { ChevronRight } from 'lucide-react';

interface IProps {
  text: string;
}

export const InternalErrorView = (props: IProps) => {
  const { text } = props;

  return (
    <Wrapper.MAIN text={text}>
      <Wrapper.SECTION text="서버 오류가 발생했습니다.">
        <Text.HEADING text="잠시 후 다시 시도해주세요." />
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
};
