import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Wrapper.MAIN>
      <div className="flex flex-col gap-2">
        <Wrapper.SECTION>
          <Text.HEADING text="안녕하세요!" className="text-center" />
        </Wrapper.SECTION>

        <Wrapper.SECTION>
          <Link
            href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`}>
            <Image
              src="/kakao_login_medium_wide.png"
              alt="Kakao Login"
              width={300}
              height={45}
              className="h-[px]"
            />
          </Link>
        </Wrapper.SECTION>

        <Wrapper.SECTION>
          <Link
            href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL}&state=peek`}>
            <Image
              src="/naver_login_light.png"
              alt="Naver Login"
              width={300}
              height={45}
              className="h-[45px]"
            />
          </Link>
        </Wrapper.SECTION>
      </div>
    </Wrapper.MAIN>
  );
}
