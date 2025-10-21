import { browserClient } from '@/lib/supabase';

export const signinByKakao = async () => {
  const supabase = browserClient();

  await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo:
        process.env.NEXT_PUBLIC_NODE_ENV === 'production'
          ? 'https://chart-weight.vercel.app/login/kakao'
          : 'http://localhost:3000/login/kakao',
    },
  });
};
