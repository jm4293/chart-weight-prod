'use server';

import { serverClient } from '@/lib/supabase';
import { SESSION_TOKEN_NAME } from '@/shared/const';
import { jwtUtil } from '@/utils/jwt-util';
import { cookies } from 'next/headers';
import { IUserModel } from '../model';

interface IVerifiedToken {
  userId: number;
  userUid: string;
}

export const getUserInfo = async (): Promise<{
  success: boolean;
  data: IUserModel | null;
}> => {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get(SESSION_TOKEN_NAME);

  if (!sessionToken) {
    return {
      success: true,
      data: null,
    };
  }

  const verifiedToken = jwtUtil().verify(sessionToken.value);
  const { userId, userUid } = verifiedToken as IVerifiedToken;

  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', userId)
    .eq('uuid', userUid)
    .single();

  if (error || !data) {
    return {
      success: false,
      data: null,
    };
  }

  return {
    success: true,
    data,
  };
};
