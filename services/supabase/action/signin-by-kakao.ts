import { browserClient } from '@/lib/supabase';

export const signinByKakao = async () => {
  const supabase = browserClient();

  await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: 'http://localhost:3000/auth/kakao',
      // redirectTo: 'https://chart-weight-prod.vercel.app/auth/kakao',
    },
  });
};
