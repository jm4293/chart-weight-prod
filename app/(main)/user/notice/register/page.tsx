import { UnauthorizedView, Wrapper } from '@/components/wrapper';
import NoticeRegister from './NoticeRegister';
import { getUserInfoByCookieAction } from '@/services/user';

export default async function NoticeRegisterPage() {
  const { data: userInfo, success, code } = await getUserInfoByCookieAction();

  if (!success || !userInfo) {
    return <UnauthorizedView text="공지사항 등록" />;
  }

  return (
    <Wrapper.MAIN text="공지사항 등록">
      <NoticeRegister userInfo={userInfo} />
    </Wrapper.MAIN>
  );
}
