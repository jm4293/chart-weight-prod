'use server';

import { serverClient } from '@/lib/supabase';
import { UserEmailType, UserStatus, UserType } from '@/shared/enum/user';

export const createUser = async (params: {
  type: UserType;
  email: string;
  email_type: UserEmailType;
  name: string;
  image: string | null;
}) => {
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('user')
    .insert({
      ...params,
      status: UserStatus.PENDING,
    })
    .single();

  if (error) {
    return { success: false };
  }

  return { success: true };
};
