'use client';

import Image from 'next/image';
import kakako from '@/public/kakao/kakao_login_large_wide.png';
import { signinByEmail, signinByKakao } from '@/services/supabase';
import { useModal, useToast } from '@/hooks/modal';
import { Button } from '@/components/button';
import { Text } from '@/components/text';
import { Input } from '@/components/input';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const { openModal, closeModal } = useModal();
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

    closeModal();
    router.push('/auth');
  };

  const handleAdminEmailLogin = () => {
    openModal({
      title: '관리자 이메일 로그인',
      content: (
        <form
          className="min-w-[480] flex flex-col gap-4"
          onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="email">
                <Text.HEADING text="이메일" />
              </label>
              <Input.EMAIL
                id="email"
                name="email"
                placeholder="이메일을 입력하세요"
                autoFocus
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
          </div>

          <Button.BLUE type="submit" text="로그인" />
        </form>
      ),
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Image
        className="min-w-[320px] cursor-pointer"
        src={kakako}
        alt="카카오 로그인"
        width={320}
        height={60}
        priority
        onClick={() => signinByKakao()}
      />
      <Button.BLUE
        className="h-[48px] flex justify-center items-center rounded-lg"
        type="button"
        text="관리자 이메일 로그인"
        onClick={handleAdminEmailLogin}
      />
    </div>
  );
}
