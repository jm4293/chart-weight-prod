'use server';

import { serverClient } from '@/lib/supabase';
import { IUserOAuthTokenModel } from '@/services/user';
import { ERROR_CODE, SESSION_TOKEN_NAME } from '@/shared/const';
import { UserEmailType } from '@/shared/enum/user';
import { IResponseType } from '@/types';
import { cookies } from 'next/headers';

interface IProps {
  userId: number;
  userUuid: string;
}

export const WithdrawAction = async (
  props: IProps,
): Promise<IResponseType<null>> => {
  const { userId, userUuid } = props;

  const supabase = await serverClient();

  const { data: oauthToken, error } = await supabase
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

  if (!oauthToken) {
    return { success: false, data: null, code: ERROR_CODE.BAD_REQUEST };
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

  await supabase.from('user').delete().eq('id', userId).eq('uuid', userUuid);

  const cookieStore = await cookies();

  cookieStore.delete(SESSION_TOKEN_NAME);

  return { success: true, data: null };
};
