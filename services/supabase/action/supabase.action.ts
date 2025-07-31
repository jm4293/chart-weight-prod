import { browserClient } from '@/lib/supabase/client';

export const signInBySupabaseKakao = async () => {
  const supabase = browserClient();

  await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: 'http://localhost:3000/auth/kakao',
    },
  });
};

export const getSupabaseUser = async () => {
  const supabase = browserClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    return null;
  }

  return data.user;
};
