import { LinkButton } from '@/components/button';
import { Text } from '@/components/text';

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminSignupVerifyPage(props: IProps) {
  const { searchParams } = props;
  const { email } = await searchParams;

  if (!email) {
    return (
      <div className="flex flex-col gap-8">
        <Text.TITLE text="관리자 회원가입 이메일 확인" />

        <div className="flex flex-col gap-2">
          <Text.HEADING text="이메일이 제공되지 않았습니다." />
          <Text.PARAGRAPH text="회원가입을 다시 시도해주세요." />
          <LinkButton.BLUE
            href="/admin/login/signup"
            text="회원가입 페이지로 이동"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="관리자 회원가입 이메일 확인" />

      <div className="flex flex-col gap-2">
        <Text.HEADING text={`이메일: ${email} 인증 링크가 전송되었습니다.`} />
        <Text.PARAGRAPH text="이메일을 확인하고 인증 링크를 클릭해주세요." />
        <Text.PARAGRAPH text="인증 링크가 도착하지 않았다면 스팸 폴더를 확인해주세요." />
        <Text.PARAGRAPH text="인증 링크가 도착하지 않았다면 다시 회원가입을 시도해주세요." />
      </div>
    </div>
  );
}
