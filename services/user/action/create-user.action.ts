'use server';

import { serverClient } from '@/lib/supabase';
import { ERROR_CODE } from '@/shared/const';
import { UserEmailType, UserStatus, UserType } from '@/shared/enum/user';
import { IResponseType } from '@/types';

interface IProps {
  type: UserType;
  email: string;
  emailType: UserEmailType;
  name: string;
  image: string | null;
}

export const createUserAction = async (
  props: IProps,
): Promise<IResponseType<null>> => {
  const supabase = await serverClient();

  const { error } = await supabase.from('user').insert({
    ...props,
    status: UserStatus.PENDING,
  });

  if (error) {
    return {
      success: false,
      data: null,
      error: error.message,
      code: ERROR_CODE.DATABASE_ERROR,
    };
  }

  return { success: true, data: null };
};
