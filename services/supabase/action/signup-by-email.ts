'use server';

import { serverClient } from '@/lib/supabase';

export const signupByEmail = async (formData: FormData) => {
  const supabase = await serverClient();

  const email = (formData.get('email') as string).trim();
  const password = (formData.get('password') as string).trim();
  const name = (formData.get('name') as string).trim();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/admin/login`,
      data: { name },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};
