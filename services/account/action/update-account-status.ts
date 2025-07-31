'use server';

import { serverClient } from '@/lib/supabase/server';
import { AccountStatus } from '@/shared/enum/account';

export const updateAccountStatus = async (
  accountId: string,
  status: AccountStatus,
): Promise<boolean> => {
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('account')
    .update({ status })
    .eq('id', accountId)
    .single();

  if (error) {
    return false;
  }

  return true;
};
