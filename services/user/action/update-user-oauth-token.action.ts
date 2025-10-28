'use server';

import { serverClient } from '@/lib/supabase';
import { IUserOAuthTokenModel } from '../model';
import { getKSTDate } from '@/utils';
import { IResponseType } from '@/types';
import { ERROR_CODE } from '@/shared/const';

interface IProps
  extends Omit<
    IUserOAuthTokenModel,
    'id' | 'uuid' | 'createdAt' | 'updatedAt' | 'userId'
  > {
  userId: number;
  userUuid: string;
}

export const UpdateUserOAuthTokenAction = async (
  props: IProps,
): Promise<IResponseType<null>> => {
  const { userId, userUuid, ...rest } = props;

  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('user_oauth_token')
    .select('*, user(*)')
    .eq('userId', userId)
    .eq('user.uuid', userUuid)
    .single<IUserOAuthTokenModel>();

  if (error) {
    return {
      success: false,
      data: null,
      error: error.message,
      code: ERROR_CODE.DATABASE_ERROR,
    };
  }

  if (!data) {
    await supabase.from('user_oauth_token').insert({ userId, ...rest });
    return { success: true, data: null };
  }

  await supabase
    .from('user_oauth_token')
    .update({
      ...rest,
      updatedAt: getKSTDate(),
    })
    .eq('id', data.id);

  return { success: true, data: null };
};
