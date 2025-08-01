'use server';

import { serverClient } from '@/lib/supabase';
import { AccountStatus, AccountType } from '@/shared/enum/account';

export const createAccount = async (params: {
  id: string;
  email: string;
  name: string;
  type: AccountType;
}) => {
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('account')
    .insert({
      ...params,
      status: AccountStatus.PENDING,
    })
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};
