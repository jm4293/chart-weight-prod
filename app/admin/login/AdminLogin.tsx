'use client';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import Link from 'next/link';

export default function AdminLogin() {
  return (
    <form className="flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="email">
          <Text.PARAGRAPH text="이메일:" />
        </label>
        <Input.EMAIL placeholder="이메일을 입력하세요" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="password">
          <Text.PARAGRAPH text="비밀번호:" />
        </label>
        <Input.PASSWORD placeholder="비밀번호를 입력하세요" />
      </div>

      <Button.BLUE type="submit" text="로그인" />

      <Link href="/admin/login/signup">
        <Button.GRAY type="button" text="회원가입" />
      </Link>
    </form>
  );
}
