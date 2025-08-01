'use server';

import { serverClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const updatePatient = async (id: string, formData: FormData) => {
  const name = formData.get('name') as string;
  const birth = formData.get('birth') as string;
  const register = formData.get('register') as string;

  const supabase = await serverClient();

  await supabase
    .from('patient')
    .update({ name, birth, register })
    .eq('id', id)
    .single();

  revalidatePath(`/admin/patient/${id}`);

  redirect(`/admin/patient/${id}`);
};
