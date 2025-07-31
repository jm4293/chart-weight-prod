'use server';

import { serverClient } from '@/lib/supabase/server';
import { IAccountEntity } from '../entity';
import { AccountStatus, AccountType } from '@/shared/enum/account';

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

export const findAllAccounts = async (): Promise<IAccountEntity[]> => {
  const supabase = await serverClient();
  const { data, error } = await supabase
    .from('account')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return [];
  }

  return data as IAccountEntity[];
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

  console.log('error', error);

  if (error) {
    return false;
  }

  return true;
};
