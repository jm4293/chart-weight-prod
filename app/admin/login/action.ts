'use server';

import { cookies } from 'next/headers';
import { serverClient } from '@/utils/supabase';

export async function loginAdmin(email: string, password: string) {
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('admin')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !data) {
    return false;
  }

  const cookieStore = await cookies();

  cookieStore.set({
    name: '__ad',
    value: JSON.stringify({
      id: data.id,
    }),
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60, // 1 hour
  });

  return true;
}
