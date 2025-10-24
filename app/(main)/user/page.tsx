import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { getUserInfo } from '@/services/user';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { SignOut } from './SignOut';
import { UserType } from '@/shared/enum/user';

export default async function UserPage() {
  const { data: userInfo, success } = await getUserInfo();

  if (!success) {
    return (
      <Wrapper.MAIN text="사용자 정보">
        <Wrapper.SECTION text="서버 오류가 발생했습니다.">
          <Text.HEADING text="잠시 후 다시 시도해주세요." />
        </Wrapper.SECTION>
      </Wrapper.MAIN>
    );
  }

  if (!userInfo) {
    return (
      <Wrapper.MAIN text="사용자 정보">
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
    <Wrapper.MAIN text="사용자 정보">
      <Text.HEADING text={`안녕하세요, ${userInfo.name}님!`} />

      {[UserType.ADMIN, UserType.DOCTOR, UserType.NURSE].includes(
        userInfo.type,
      ) && (
        <Wrapper.SECTION text="관리자">
          <Link href="/user/patient" className="flex justify-between">
            <Text.HEADING text="환자 리스트" />
            <ChevronRight />
          </Link>
          <Link href="/user/member" className="flex justify-between">
            <Text.HEADING text="직원 리스트" />
            <ChevronRight />
          </Link>
        </Wrapper.SECTION>
      )}

      <Wrapper.SECTION text="기록">
        <Link href="/user/weight" className="flex justify-between">
          <Text.HEADING text="몸무게 기록" />
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>

      <Wrapper.SECTION text="계정">
        <Link href="/user/account" className="flex justify-between">
          <Text.HEADING text="계정 수정" />
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>

      <SignOut />
    </Wrapper.MAIN>
  );
}
