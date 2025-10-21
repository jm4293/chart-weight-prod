'use server';

import { SESSION_TOKEN_EXPIRE, SESSION_TOKEN_NAME } from '@/shared/const';
import { jwtUtil } from '@/utils/jwt-util';
import { cookies } from 'next/headers';

interface IProps {
  userId: number;
  userUid: string;
}

export const signInCookie = async (props: IProps) => {
  const { userId, userUid } = props;

  const cookieStore = await cookies();

  const sessionToken = jwtUtil().sign(
    { userId, userUid, mutatePayload: true },
    userUid,
    SESSION_TOKEN_EXPIRE,
  );

  cookieStore.set(SESSION_TOKEN_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_TOKEN_EXPIRE,
    path: '/',
  });

  return { success: true };
};
