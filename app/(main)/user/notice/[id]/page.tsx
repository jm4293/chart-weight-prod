import { Wrapper } from '@/components/wrapper';
import NoticeDetail from './NoticeDetail';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function NoticeDetailPage(props: IProps) {
  const { params } = props;
  const { id: noticeId } = await params;

  return (
    <Wrapper.MAIN text="공지사항 상세">
      <NoticeDetail noticeId={noticeId} />
    </Wrapper.MAIN>
  );
}
