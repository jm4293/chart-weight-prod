'use client';

import Image from 'next/image';
import kakako from '@/public/kakao/kakao_login_large_wide.png';
import { signInBySupabaseKakao } from '@/services/supabase';

export default function Login() {
  return (
    <div className="flex justify-center">
      <Image
        className="cursor-pointer"
        src={kakako}
        alt="카카오 로그인"
        width={360}
        priority
        onClick={() => signInBySupabaseKakao()}
      />
    </div>
  );
}
