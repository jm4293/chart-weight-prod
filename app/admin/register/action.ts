'use server';

import api from '@/lib/fetch/fetch';
import { cookies } from 'next/headers';

export async function registerPatient(params: {
  name: string;
  birth: string;
  register_num: number;
}) {
  const cookie = (await cookies()).get('connect.sid');

  console.log('registerPatient params', params);
  console.log('registerPatient cookie', cookie);

  const ret = await api.post(
    `${process.env.NEXT_PUBLIC_API_URL}/patient/register`,
    {
      json: params,
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
    },
  );

  console.log('registerPatient ret', ret);

  if (!ret.ok) {
    return { success: false };
  }

  return { success: true };
}
