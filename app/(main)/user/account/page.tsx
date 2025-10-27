import { Wrapper } from '@/components/wrapper';
import { getUserInfoByCookie } from '@/services/user';
import Withdraw from './Withdraw';

export default async function UserAccountPage() {
  const { data: userInfo, success } = await getUserInfoByCookie();

  if (!success || !userInfo) {
    return (
      <Wrapper.MAIN text="계정">
        <Wrapper.SECTION text="사용자 정보를 불러올 수 없습니다." />
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="계정">
      <Withdraw userInfo={userInfo} />
    </Wrapper.MAIN>
  );
}
