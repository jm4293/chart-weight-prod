import { serverClient } from '@/lib/supabase';
import { SESSION_TOKEN_NAME } from '@/shared/const';
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
  const limit = Math.max(20, Number(searchParams.get('limit')) || 20);

  const accessToken = cookieStore.get(SESSION_TOKEN_NAME);

  if (!accessToken) {
    return new Response(
      JSON.stringify({ success: false, error: 'No access token' }),
      {
        status: 401,
      },
    );
  }

  const verifiedToken = jwtUtil<IVerifiedToken>().verify(accessToken!.value);
  const { userId, userUid } = verifiedToken;

  const supabase = await serverClient();

  const { data, error, count } = await supabase
    .from('weight')
    .select('*', { count: 'exact' })
    .eq('userId', userId)
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
