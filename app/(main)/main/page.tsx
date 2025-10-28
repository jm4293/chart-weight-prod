import { Wrapper } from '@/components/wrapper';
import NoticeList from './NoticeList';

export default function mainPage() {
  return (
    <Wrapper.MAIN text="메인">
      <Wrapper.SECTION text="공지사항">
        <NoticeList />
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
