import { serverClient } from '@/lib/supabase';
import { IUserOAuthTokenModel } from '@/services/user';
import { IWeightModel } from '@/services/weight';
import { SESSION_TOKEN_NAME } from '@/shared/const';
import { UserEmailType } from '@/shared/enum/user';
import { cookies } from 'next/headers';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('user')
    .select('*, weight(*)')
    .eq('id', id)
    .limit(10, { referencedTable: 'weight' })
    .single<IWeightModel>();

  if (error) {
    return new Response(
      `Error fetching user patient detail: ${error.message}`,
      {
        status: 500,
      },
    );
  }

  return new Response(JSON.stringify({ success: true, data }), {
    status: 200,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  const supabase = await serverClient();

  const { data, error } = await supabase.from('user').update(body).eq('id', id);

  if (error) {
    return new Response(
      `Error updating user patient detail: ${error.message}`,
      {
        status: 500,
      },
    );
  }

  return new Response(JSON.stringify({ success: true, data }), {
    status: 200,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const supabase = await serverClient();

  const { data: oauthToken } = await supabase
    .from('user_oauth_token')
    .select('*, user!inner(*)')
    .eq('userId', id)
    .single<IUserOAuthTokenModel>();

  if (!oauthToken) {
    return new Response(`OAuth token not found for user id: ${id}`, {
      status: 400,
    });
  }

  if (oauthToken.provider === UserEmailType.KAKAO) {
    await fetch('https://kapi.kakao.com/v2/user/me?secure_resource=false', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${oauthToken.accessToken}`,
      },
    });

    await fetch('https://kapi.kakao.com/v1/user/unlink', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${oauthToken.accessToken}`,
      },
    });
  }

  if (oauthToken.provider === UserEmailType.NAVER) {
    await fetch(
      `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET}&access_token=${oauthToken.accessToken}&service_provider=NAVER`,
      { method: 'POST' },
    );
  }

  const { data, error } = await supabase.from('user').delete().eq('id', id);

  if (error) {
    return new Response(
      `Error deleting user patient detail: ${error.message}`,
      {
        status: 500,
      },
    );
  }

  return new Response(JSON.stringify({ success: true, data }), {
    status: 200,
  });
}
