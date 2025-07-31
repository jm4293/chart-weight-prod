'use server';

import { serverClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const updateAccount = async (id: string, formData: FormData) => {
  const name = formData.get('name') as string;
  const status = formData.get('status') as string;

  console.log('updateAccount', { id, name, status });

  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('account')
    .update({ name, status })
    .eq('id', id);

  console.log('updateAccount', { data, error });

  revalidatePath(`/admin/account/${id}`);

  redirect(`/admin/account/${id}`);
};
