import { browserClient } from '@/lib/supabase/client';

export const getSupabaseUserInfo = async () => {
  const supabase = browserClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    return null;
  }

  return data.user;
};
