import { LinkText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { getUserInfo } from '@/services/user';
import { SignOut } from './SignOut';
import { UserType } from '@/shared/enum/user';

export default async function UserPage() {
  const { data: userInfo, success } = await getUserInfo();

  if (!success || !userInfo) {
    return (
      <Wrapper.MAIN text="사용자 정보">
        <Wrapper.SECTION text="로그인이 필요합니다.">
          <LinkText href="/login" text="로그인 페이지로 이동" />
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
          <LinkText href="/user/patient" text="환자 관리" />
          <LinkText href="/user/member" text="직원 관리" />
          <LinkText href="/user/notice" text="공지사항 관리" />
        </Wrapper.SECTION>
      )}

      <Wrapper.SECTION text="기록">
        <LinkText href="/user/weight" text="몸무게 기록" />
      </Wrapper.SECTION>

      <Wrapper.SECTION text="계정">
        <LinkText href="/user/account" text="계정 수정" />
      </Wrapper.SECTION>

      <SignOut />
    </Wrapper.MAIN>
  );
}
