import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Wrapper.MAIN>
      <Wrapper.SECTION>
        <div className="flex flex-col items-center gap-4">
          <Text.HEADING text="안녕하세요!" />

          <Link
            href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`}>
            <Image
              src="/kakao_login_medium_wide.png"
              alt="Kakao Login"
              width={300}
              height={45}
            />
          </Link>
        </div>
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
