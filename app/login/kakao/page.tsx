import { Wrapper } from '@/components/wrapper';
import { LinkText, Text } from '@/components/text';
import { oauthKakaoAction } from '@/services/auth';
import Login from '../_component/Login';

interface IProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function KakaoLoginPage(props: IProps) {
  const { code } = await props.searchParams;

  if (!code) {
    return (
      <Wrapper.MAIN text="카카오 로그인">
        <Wrapper.SECTION text="잘못된 접근입니다." />

        <Wrapper.SECTION>
          <LinkText href="/login" text="로그인 페이지로 이동" />
        </Wrapper.SECTION>
      </Wrapper.MAIN>
    );
  }

  const { success, data } = await oauthKakaoAction(code);

  if (!success || !data) {
    return (
      <Wrapper.MAIN text="카카오 로그인">
        <Wrapper.SECTION text="카카오 서버 오류로 인해 로그인에 실패했습니다.">
          <Text.HEADING text="잠시 후 다시 시도해주세요." />
        </Wrapper.SECTION>

        <Wrapper.SECTION>
          <LinkText href="/login" text="로그인 페이지로 이동" />
        </Wrapper.SECTION>
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="카카오 로그인">
      <Wrapper.SECTION>
        <Text.HEADING text={`환영합니다, ${data.user.name}님!`} />
        <Text.PARAGRAPH text={`카카오 이메일: ${data.user.email}`} />
      </Wrapper.SECTION>

      <Login data={data} />
    </Wrapper.MAIN>
  );
}
