'use server';

import { SESSION_TOKEN_EXPIRE, SESSION_TOKEN_NAME } from '@/shared/const';
import { jwtUtil } from '@/utils/jwt-util';
import { cookies } from 'next/headers';

interface IProps {
  userId: number;
  userUuid: string;
}

export const signInAction = async (props: IProps) => {
  const { userId, userUuid } = props;

  const cookieStore = await cookies();

  const sessionToken = jwtUtil().sign(
    { id: userId, uuid: userUuid, mutatePayload: true },
    userUuid,
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
