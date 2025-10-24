import { serverClient } from '@/lib/supabase';
import { SESSION_TOKEN_NAME } from '@/shared/const';
import { UserType } from '@/shared/enum/user';
import { jwtUtil } from '@/utils/jwt-util';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

interface IVerifiedToken {
  userId: number;
  userUid: string;
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();

  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.max(10, Number(searchParams.get('limit')) || 10);

  const accessToken = cookieStore.get(SESSION_TOKEN_NAME);

  if (!accessToken) {
    return new Response(
      JSON.stringify({ success: false, error: 'No access token' }),
      {
        status: 401,
      },
    );
  }

  jwtUtil<IVerifiedToken>().verify(accessToken!.value);

  const supabase = await serverClient();

  const { data, error, count } = await supabase
    .from('user')
    .select('*', { count: 'exact' })
    .in('type', [UserType.DOCTOR, UserType.NURSE])
    .order('createdAt', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
      },
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      data,
      total: count,
    }),
    {
      status: 200,
    },
  );
}
