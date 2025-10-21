'use server';

import { serverClient } from '@/lib/supabase';
import { SESSION_TOKEN_NAME } from '@/shared/const';
import { cookies } from 'next/headers';

interface IProps {
  userId: number;
  userUid: string;
}

export const WithdrawAction = async (props: IProps) => {
  const { userId, userUid } = props;

  const supabase = await serverClient();

  try {
    const { data: oauthToken, error } = await supabase
      .from('user_oauth_token')
      .select('*')
      .eq('userId', userId)
      .single();

    if (error || !oauthToken) {
      throw new Error('User OAuth token not found');
    }

    const kakaoUserInfoResponse = await fetch(
      'https://kapi.kakao.com/v2/user/me?secure_resource=false',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: `Bearer ${oauthToken.accessToken}`,
        },
      },
    );

    const kakaoUserInfo = await kakaoUserInfoResponse.json();

    if (!kakaoUserInfo) {
      throw new Error('Failed to fetch Kakao user info');
    }

    const unlinkResponse = await fetch(
      'https://kapi.kakao.com/v1/user/unlink',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${oauthToken.accessToken}`,
        },
      },
    );
    const unlinkResult = await unlinkResponse.json();

    await supabase
      .from('user')
      .delete()
      .eq('id', userId)
      .eq('uuid', userUid)
      .single();

    const cookieStore = await cookies();

    cookieStore.delete(SESSION_TOKEN_NAME);
  } catch (error) {
    console.error('Error during withdrawal:', error);
  }
};
