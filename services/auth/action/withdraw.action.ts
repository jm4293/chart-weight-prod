'use server';

import { serverClient } from '@/lib/supabase';
import { IUserOAuthTokenModel } from '@/services/user';
import { SESSION_TOKEN_NAME } from '@/shared/const';
import { UserEmailType } from '@/shared/enum/user';
import { cookies } from 'next/headers';

interface IProps {
  userId: number;
  userUuid: string;
}

export const WithdrawAction = async (props: IProps) => {
  const { userId, userUuid } = props;

  const supabase = await serverClient();

  const { data: oauthToken } = await supabase
    .from('user_oauth_token')
    .select('*, user!inner(*)')
    .eq('userId', userId)
    .eq('user.uuid', userUuid)
    .single<IUserOAuthTokenModel>();

  if (!oauthToken) {
    return { success: false, data: null };
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
};
