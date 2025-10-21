import { Wrapper } from '@/components/wrapper';

export default function mainPage() {
  return (
    <Wrapper.MAIN text="메인">
      <Wrapper.SECTION text="공지사항"></Wrapper.SECTION>
      <Wrapper.SECTION text="병원 일정"></Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
