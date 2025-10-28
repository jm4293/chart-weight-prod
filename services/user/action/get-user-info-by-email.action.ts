'use server';

import { serverClient } from '@/lib/supabase';
import { UserEmailType } from '@/shared/enum/user';
import { IUserModel } from '../model';
import { IResponseType } from '@/types';
import { ERROR_CODE } from '@/shared/const';

interface IProps {
  email: string;
  emailType: UserEmailType;
}

export const getUserInfoByEmailAction = async (
  props: IProps,
): Promise<IResponseType<IUserModel | null>> => {
  const { email, emailType } = props;

  if (!email || !emailType) {
    return {
      success: false,
      data: null,
      code: ERROR_CODE.INVALID_INPUT,
    };
  }

  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('email', email)
    .eq('emailType', emailType)
    .single<IUserModel>();

  if (error) {
    return {
      success: false,
      data: null,
      error: error.message,
      code: ERROR_CODE.DATABASE_ERROR,
    };
  }

  return { success: true, data };
};
