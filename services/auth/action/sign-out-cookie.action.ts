'use server';

import { SESSION_TOKEN_NAME } from '@/shared/const';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const signOutCookie = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_TOKEN_NAME);

  redirect('/main');
};
