'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from './action';
import { Button } from '@/components/button';

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    startTransition(async () => {
      const ret = await loginAdmin(email, password);

      if (!ret) {
        setMessage('로그인 실패');
        return;
      }

      router.push('/admin/dashboard');
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-center text-2xl font-bold mb-4">관리페이지 로그인</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="text"
          placeholder="아이디"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <Button
          type="submit"
          color="blue"
          text={isPending ? '로그인 중...' : '로그인'}
          disabled={isPending}
        />
        {message && <p className="text-red-500 text-center">{message}</p>}
      </form>
    </div>
  );
}
