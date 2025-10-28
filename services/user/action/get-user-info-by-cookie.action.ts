'use server';

import { serverClient } from '@/lib/supabase';
import { ERROR_CODE, SESSION_TOKEN_NAME } from '@/shared/const';
import { jwtUtil } from '@/utils/jwt-util';
import { cookies } from 'next/headers';
import { IUserModel } from '../model';
import { IResponseType } from '@/types';

export const getUserInfoByCookieAction = async (): Promise<
  IResponseType<IUserModel | null>
> => {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get(SESSION_TOKEN_NAME);

  if (!sessionToken) {
    return {
      success: false,
      data: null,
      code: ERROR_CODE.UNAUTHORIZED,
    };
  }

  const verifiedToken = jwtUtil().verify(sessionToken.value);
  const { id, uuid } = verifiedToken;

  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', id)
    .eq('uuid', uuid)
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
