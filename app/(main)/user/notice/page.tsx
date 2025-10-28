import { Wrapper } from '@/components/wrapper';
import Notice from './Notice';
import Link from 'next/link';
import { Text } from '@/components/text';

export default function NoticePage() {
  return (
    <Wrapper.MAIN text="공지사항">
      <Wrapper.SECTION>
        <Link href="/user/notice/register">
          <Text.HEADING
            text="공지사항 등록"
            className="text-blue-500 text-end"
          />
        </Link>
      </Wrapper.SECTION>
      <Notice />
    </Wrapper.MAIN>
  );
}
