import { UserEmailType } from '@/shared/enum/user';

export const oauthNaver = async (code: string) => {
  const response = await fetch(
    `https://nid.naver.com/oauth2.0/token?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET}&grant_type=authorization_code&code=${code}&state=yonseipureclinic`,
    { method: 'GET' },
  );

  const { token_type, access_token, expires_in, refresh_token } =
    await response.json();

  const userResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  const user = await userResponse.json();
  const { email, name, profile_image } = user.response;

  return {
    success: true,
    data: {
      user: {
        email,
        name,
        image: profile_image,
        emailType: UserEmailType.NAVER,
      },
      token: {
        token_type,
        access_token,
        access_token_expires_in: expires_in,
        refresh_token,
        refresh_token_expires_in: null,
      },
    },
  };
};
