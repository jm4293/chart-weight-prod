'use server';

import { serverClient } from '@/lib/supabase';

export const deleteAccount = async (accountId: string) => {
  const supabase = await serverClient();

  const { error } = await supabase.from('account').delete().eq('id', accountId);

  if (error) {
    return { success: false };
  }

  return { success: true };
};
