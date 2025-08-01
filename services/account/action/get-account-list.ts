'use server';

import { serverClient } from '@/lib/supabase';
import { IAccountEntity } from '../entity';
import { AccountType } from '@/shared/enum/account';

export const getAccountList = async (): Promise<IAccountEntity[]> => {
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('account')
    .select('*')
    .not('type', 'in', `(${AccountType.MASTER},${AccountType.ADMIN})`)
    .order('name', { ascending: false });

  if (error || !data) {
    return [];
  }

  return data;
};
