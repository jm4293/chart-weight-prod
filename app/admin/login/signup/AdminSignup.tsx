'use client';

import { Button, LinkButton } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { useToast } from '@/hooks/modal';
import { signupByEmail } from '@/services/supabase';
import { useRouter } from 'next/navigation';

export default function AdminSignup() {
  const router = useRouter();
  const { openToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const email = form.get('email') as string;
    const password = form.get('password') as string;
    const name = form.get('name') as string;

    if (email.trim() === '' || password.trim() === '' || name.trim() === '') {
      openToast({
        type: 'error',
        message: '모든 필드를 입력해주세요.',
      });
      return;
    }

    const { success, error } = await signupByEmail(form);

    if (!success) {
      openToast({
        type: 'error',
        message: `회원가입에 실패했습니다: ${error}`,
      });

      return;
    }

    openToast({
      type: 'success',
      message:
        '입력하신 이메일로 인증 링크가 전송되었습니다. 이메일을 확인해주세요.',
    });

    router.push(
      '/admin/login/signup/verify?email=' + encodeURIComponent(email),
    );
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
            minLength={6}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="name">
            <Text.HEADING text="이름" />
          </label>
          <Input.TEXT id="name" name="name" placeholder="이름을 입력하세요" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button.BLUE type="submit" text="회원가입" />
        <LinkButton.GRAY href="/admin/login" text="뒤로가기" />
      </div>
    </form>
  );
}
