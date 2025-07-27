'use server';

import { serverClient } from '@/utils/supabase';
import { IAccountEntity } from '../entity';
import { AccountStatus, AccountType } from '../enum';

export const findByAccountId = async (
  accountId: string,
): Promise<IAccountEntity | null> => {
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('account')
    .select('*')
    .eq('id', accountId)
    .single();

  return data;
};

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
    return false;
  }

  return true;
};
