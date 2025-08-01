'use server';

import { serverClient } from '@/lib/supabase';
import { cookies } from 'next/headers';

export const signinByEmail = async (formData: FormData) => {
  const cookieStore = await cookies();
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

  const { user } = data;
  const { user_metadata } = user;
  const { name } = user_metadata;

  cookieStore.set('__SE', JSON.stringify({ email, name }), {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return { success: true, error: null, user: data.user };
};
