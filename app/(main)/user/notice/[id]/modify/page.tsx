import { Wrapper } from '@/components/wrapper';
import NoticeModify from './NoticeModify';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function NoticeModifyPage(props: IProps) {
  const { params } = props;
  const { id: noticeId } = await params;

  return (
    <Wrapper.MAIN text="공지사항 수정">
      <NoticeModify noticeId={noticeId} />
    </Wrapper.MAIN>
  );
}
