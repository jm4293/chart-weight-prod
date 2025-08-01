'use client';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { useToast } from '@/hooks/modal';
import { signinByEmail } from '@/services/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const { openToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const { success, error, user } = await signinByEmail(form);

    if (!success) {
      openToast({
        type: 'error',
        message: `로그인에 실패했습니다: ${error}`,
      });
      return;
    }

    openToast({
      type: 'success',
      message: `${user!.email}님 로그인에 성공했습니다.`,
    });

    router.push('/admin/auth');
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="email">
            <Text.HEADING text="이메일" />
          </label>
          <Input.EMAIL
            id="email"
            name="email"
            placeholder="이메일을 입력하세요"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="password">
            <Text.HEADING text="비밀번호" />
          </label>
          <Input.PASSWORD
            id="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            required
            minLength={6}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button.BLUE type="submit" text="관리자 로그인" />
        <Link href="/admin/login/signup">
          <Button.BLUE className="w-full" text="관리자 회원가입" />
        </Link>
      </div>
    </form>
  );
}
