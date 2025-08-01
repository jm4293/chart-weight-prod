'use server';

import { serverClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const updateAccount = async (id: string, formData: FormData) => {
  const name = formData.get('name') as string;
  const status = formData.get('status') as string;

  const supabase = await serverClient();

  await supabase.from('account').update({ name, status }).eq('id', id);

  revalidatePath(`/admin/account/${id}`);

  redirect(`/admin/account/${id}`);
};
