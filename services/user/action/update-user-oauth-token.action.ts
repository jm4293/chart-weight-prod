'use server';

import { serverClient } from '@/lib/supabase';
import { IUserOAuthTokenModel } from '../model';

interface IProps
  extends Omit<
    IUserOAuthTokenModel,
    'id' | 'uuid' | 'createdAt' | 'updatedAt'
  > {
  userId: number;
}

export const UpdateUserOAuthTokenAction = async (props: IProps) => {
  const { userId, ...rest } = props;

  const supabase = await serverClient();

  const { data } = await supabase
    .from('user_oauth_token')
    .select('*')
    .eq('userId', userId)
    .single();

  if (!data) {
    await supabase.from('user_oauth_token').insert(props).single();
    return;
  }

  await supabase
    .from('user_oauth_token')
    .update(rest)
    .eq('userId', userId)
    .single();
};
