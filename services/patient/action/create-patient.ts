'use server';

import { serverClient } from '@/lib/supabase';

export const createPatient = async (formData: FormData) => {
  const supabase = await serverClient();

  const name = (formData.get('name') as string).trim();
  const birth = (formData.get('birth') as string).trim();
  const register = (formData.get('register') as string).trim();

  const { error } = await supabase.from('patient').insert({
    name,
    birth,
    register,
  });

  if (error) {
    return { success: false, error: error?.message };
  }

  return { success: true };
};
