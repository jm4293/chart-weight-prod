'use server';

import { UserEmailType } from '@/shared/enum/user';

export const oauthKakao = async (code: string) => {
  const response = await fetch(
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&code=${code}&client_secret=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET}`,
    { method: 'GET' },
  );

  const {
    token_type,
    access_token,
    expires_in,
    refresh_token,
    refresh_token_expires_in,
    scope,
  } = await response.json();

  const userResponse = await fetch(
    'https://kapi.kakao.com/v2/user/me?secure_resource=false',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  const user = await userResponse.json();
  const { kakao_account } = user;
  const { email, profile } = kakao_account;
  const { nickname, profile_image_url } = profile;

  return {
    success: true,
    data: {
      user: {
        email,
        name: nickname,
        image: profile_image_url,
        emailType: UserEmailType.KAKAO,
      },
      token: {
        token_type,
        access_token,
        access_token_expires_in: expires_in,
        refresh_token,
        refresh_token_expires_in,
      },
    },
  };
};
