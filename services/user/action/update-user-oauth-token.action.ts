'use server';

import { serverClient } from '@/lib/supabase';
import { IUserOAuthTokenModel } from '../model';
import { getKSTDate } from '@/utils';

interface IProps
  extends Omit<
    IUserOAuthTokenModel,
    'id' | 'uuid' | 'createdAt' | 'updatedAt' | 'userId'
  > {
  userId: number;
  userUuid: string;
}

export const UpdateUserOAuthTokenAction = async (props: IProps) => {
  const { userId, userUuid, ...rest } = props;

  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('user_oauth_token')
    .select('*, user!inner(*)')
    .eq('userId', userId)
    .eq('user.uuid', userUuid)
    .single<IUserOAuthTokenModel>();

  if (!data) {
    await supabase.from('user_oauth_token').insert({ userId, ...rest });
    return;
  }

  await supabase
    .from('user_oauth_token')
    .update({
      ...rest,
      updatedAt: getKSTDate(),
    })
    .eq('id', data.id);
};
