import { browserClient } from '@/lib/supabase/client';

export const signinByKakao = async () => {
  const supabase = browserClient();

  await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: 'http://localhost:3000/auth/kakao',
    },
  });
};
