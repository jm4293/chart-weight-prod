'use server';

import { serverClient } from '@/lib/supabase/server';

export const signinByEmail = async (formData: FormData) => {
  const supabase = await serverClient();

  const email = (formData.get('email') as string).trim();
  const password = (formData.get('password') as string).trim();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message, user: null };
  }

  return { success: true, error: null, user: data.user };
};
