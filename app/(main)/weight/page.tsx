import { Text } from '@/components/text';
import {
  InternalErrorView,
  UnauthorizedView,
  Wrapper,
} from '@/components/wrapper';
import { getUserInfoByCookieAction } from '@/services/user';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Profile from './Profile';
import Register from './Register';
import { ERROR_CODE } from '@/shared/const';

export default async function weightPage() {
  const { data: userInfo, success, code } = await getUserInfoByCookieAction();

  if (!success && code === ERROR_CODE.DATABASE_ERROR) {
    return <InternalErrorView text="몸무게 등록" />;
  }

  if (!success && code === ERROR_CODE.UNAUTHORIZED) {
    return <UnauthorizedView text="몸무게 등록" />;
  }

  return (
    <Wrapper.MAIN text="몸무게 등록">
      <Text.HEADING text={`안녕하세요, ${userInfo!.name}님!`} />
      <Profile userInfo={userInfo!} />
      <Register userInfo={userInfo!} />
    </Wrapper.MAIN>
  );
}
