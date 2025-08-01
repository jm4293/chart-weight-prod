'use server';

import { serverClient } from '@/lib/supabase';
import { IAccountEntity } from '../entity';

export const getAccount = async (
  accountId: string,
): Promise<IAccountEntity | null> => {
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('account')
    .select('*')
    .eq('id', accountId)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
};
