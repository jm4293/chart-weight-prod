'use server';

import { serverClient } from '@/lib/supabase';
import { ERROR_CODE, SESSION_TOKEN_NAME } from '@/shared/const';
import { UserEmailType } from '@/shared/enum/user';
import { cookies } from 'next/headers';
import { IUserOAuthTokenModel } from '../model';
import { IResponseType } from '@/types';

interface IDeleteUserProps {
  userId: number;
  userUuid: string;
}

export async function deleteUserAction(
  props: IDeleteUserProps,
): Promise<IResponseType<null>> {
  const { userId, userUuid } = props;

  if (!userId || !userUuid) {
    return {
      success: false,
      data: null,
      code: ERROR_CODE.INVALID_INPUT,
    };
  }

  const supabase = await serverClient();

  const { data: oauthToken, error: oauthTokenError } = await supabase
    .from('user_oauth_token')
    .select('*, user!inner(*)')
    .eq('userId', userId)
    .single<IUserOAuthTokenModel>();

  if (oauthTokenError) {
    return {
      success: false,
      data: null,
      error: oauthTokenError.message,
      code: ERROR_CODE.DATABASE_ERROR,
    };
  }

  if (oauthToken.provider === UserEmailType.KAKAO) {
    await fetch('https://kapi.kakao.com/v2/user/me?secure_resource=false', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${oauthToken.accessToken}`,
      },
    });

    await fetch('https://kapi.kakao.com/v1/user/unlink', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${oauthToken.accessToken}`,
      },
    });
  }

  if (oauthToken.provider === UserEmailType.NAVER) {
    await fetch(
      `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET}&access_token=${oauthToken.accessToken}&service_provider=NAVER`,
      { method: 'POST' },
    );
  }

  const { error } = await supabase
    .from('user')
    .delete()
    .eq('id', userId)
    .eq('uuid', userUuid);

  if (error) {
    return {
      success: false,
      data: null,
      error: error.message,
      code: ERROR_CODE.DATABASE_ERROR,
    };
  }

  const cookieStore = await cookies();
  cookieStore.delete(SESSION_TOKEN_NAME);

  return {
    success: true,
    data: null,
  };
}
