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
      emailRedirectTo: 'http://localhost:3000/admin/login',
      data: { name },
    },
  });

  console.log('signUpBySupabaseEmail error', error);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};
