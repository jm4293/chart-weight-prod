import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { getUserInfo } from '@/services/user';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Profile from './Profile';
import Register from './Register';

export default async function mainPage() {
  const { data: userInfo, success } = await getUserInfo();

  if (!success) {
    return (
      <Wrapper.MAIN text="몸무게 등록">
        <Wrapper.SECTION text="서버 오류가 발생했습니다.">
          <Text.HEADING text="잠시 후 다시 시도해주세요." />
        </Wrapper.SECTION>
      </Wrapper.MAIN>
    );
  }

  if (!userInfo) {
    return (
      <Wrapper.MAIN text="몸무게 등록">
        <Wrapper.SECTION text="로그인이 필요합니다.">
          <Link href="/login" className="flex justify-between">
            <Text.HEADING text="로그인 페이지로 이동" />
            <ChevronRight />
          </Link>
        </Wrapper.SECTION>
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="몸무게 등록">
      <Text.HEADING text={`안녕하세요, ${userInfo.name}님!`} />

      <Profile userInfo={userInfo} />
      <Register />
    </Wrapper.MAIN>
  );
}
