import {
  InternalErrorView,
  UnauthorizedView,
  Wrapper,
} from '@/components/wrapper';
import { getUserInfoByCookieAction } from '@/services/user';
import Withdraw from './Withdraw';
import { ERROR_CODE } from '@/shared/const';

export default async function UserAccountPage() {
  const { data, success, code } = await getUserInfoByCookieAction();

  if (!success && code === ERROR_CODE.UNAUTHORIZED) {
    return <UnauthorizedView text="계정" />;
  }

  if (!success && code === ERROR_CODE.DATABASE_ERROR) {
    return <InternalErrorView text="계정" />;
  }

  if (!data) {
    return (
      <Wrapper.MAIN text="계정">
        <Wrapper.SECTION text="사용자 정보를 불러올 수 없습니다." />
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="계정">
      <Withdraw userInfo={data} />
    </Wrapper.MAIN>
  );
}
