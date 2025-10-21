'use server';

import { serverClient } from '@/lib/supabase';
import { UserEmailType } from '@/shared/enum/user';
import { IUserModel } from '../model';

export const getUserInfoByEmail = async (params: {
  email: string;
  emailType: UserEmailType;
}): Promise<{ success: boolean; data: IUserModel | null }> => {
  const { email, emailType } = params;

  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('email', email)
    .eq('email_type', emailType)
    .single();

  if (error || !data) {
    return { success: false, data: null };
  }

  return { success: true, data };
};
