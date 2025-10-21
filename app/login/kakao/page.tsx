import { Wrapper } from '@/components/wrapper';
import KakaoLogin from './KakaoLogin';
import { Text } from '@/components/text';
import { oauthKakao } from '@/services/auth';

interface IProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function KakaoLoginPage(props: IProps) {
  const { code } = await props.searchParams;

  if (!code) {
    return (
      <Wrapper.MAIN text="Kakao 로그인">
        <Wrapper.SECTION>
          <Text.PARAGRAPH text="잘못된 접근입니다." />
        </Wrapper.SECTION>
      </Wrapper.MAIN>
    );
  }

  const { success, data } = await oauthKakao(code);

  if (!success || !data) {
    return (
      <Wrapper.MAIN text="Kakao 로그인">
        <Wrapper.SECTION>
          <Text.PARAGRAPH text="Kakao 로그인에 실패했습니다." />
        </Wrapper.SECTION>
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="Kakao 로그인">
      <Wrapper.SECTION>
        <Text.HEADING text={`환영합니다, ${data.user.name}님!`} />
        <Text.PARAGRAPH text={`이메일: ${data.user.email}`} />
      </Wrapper.SECTION>

      <Wrapper.SECTION text="로그인 진행">
        <KakaoLogin data={data} />
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
