import { browserClient } from '@/lib/supabase';

export const signinByKakao = async () => {
  const supabase = browserClient();

  await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/login/auth/kakao`,
    },
  });
};
