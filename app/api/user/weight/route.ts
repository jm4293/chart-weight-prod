import { serverClient } from '@/lib/supabase';
import { SESSION_TOKEN_NAME } from '@/shared/const';
import { jwtUtil } from '@/utils/jwt-util';
import dayjs from 'dayjs';
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

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
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

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      throw new Response(
        JSON.stringify({ success: false, error: 'No file provided' }),
        {
          status: 400,
        },
      );
    }

    const supabase = await serverClient();
    const today = dayjs().format('YYYY-MM-DD');

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(`${today}/${userId}_${file.name}`, file, {
        contentType: file.type,
      });

    if (uploadError) {
      throw new Response(
        JSON.stringify({ success: false, error: uploadError.message }),
        {
          status: 500,
        },
      );
    }

    if (!uploadData) {
      throw new Response(
        JSON.stringify({ success: false, error: 'File upload failed' }),
        {
          status: 500,
        },
      );
    }

    const { data: weightData, error: weightError } = await supabase
      .from('weight')
      .insert({
        userId: userId,
        weight: null,
        imageUrl: uploadData.fullPath,
      })
      .select()
      .single();

    if (weightError) {
      throw new Response(
        JSON.stringify({ success: false, error: weightError.message }),
        {
          status: 500,
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: weightData,
      }),
      {
        status: 201,
      },
    );
  } catch (error) {
    throw new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
      },
    );
  }
}
