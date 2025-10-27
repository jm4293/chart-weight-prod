'use server';

import { serverClient } from '@/lib/supabase';
import { UserEmailType, UserStatus, UserType } from '@/shared/enum/user';

interface IProps {
  type: UserType;
  email: string;
  emailType: UserEmailType;
  name: string;
  image: string | null;
}

export const createUser = async (props: IProps) => {
  const supabase = await serverClient();

  const { data, error } = await supabase.from('user').insert({
    ...props,
    status: UserStatus.PENDING,
  });

  if (error) {
    return { success: false };
  }

  return { success: true };
};
