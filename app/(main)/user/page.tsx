import { LinkText, Text } from '@/components/text';
import { UnauthorizedView, Wrapper } from '@/components/wrapper';
import { getUserInfoByCookieAction } from '@/services/user';
import { UserType, UserTypeLabels } from '@/shared/enum/user';
import SignOut from './SignOut';

export default async function UserPage() {
  const { data: userInfo, success } = await getUserInfoByCookieAction();

  if (!success || !userInfo) {
    return <UnauthorizedView text="사용자 정보" />;
  }

  return (
    <Wrapper.MAIN text="사용자 정보">
      <Text.HEADING
        text={`안녕하세요, ${UserTypeLabels[userInfo.type]} ${userInfo.name}님!`}
      />

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
