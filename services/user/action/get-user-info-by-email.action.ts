'use server';

import { serverClient } from '@/lib/supabase';
import { UserEmailType } from '@/shared/enum/user';
import { IUserModel } from '../model';

interface IProps {
  email: string;
  emailType: UserEmailType;
}

export const getUserInfoByEmail = async (props: IProps) => {
  const { email, emailType } = props;

  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('email', email)
    .eq('emailType', emailType)
    .single<IUserModel>();

  if (error || !data) {
    return { success: true, data: null };
  }

  return { success: true, data };
};
