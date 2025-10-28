import { serverClient } from '@/lib/supabase';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.max(10, Number(searchParams.get('limit')) || 10);

  const supabase = await serverClient();

  const { data, error, count } = await supabase
    .from('notice')
    .select(`*, user:userId(*)`, { count: 'exact' })
    .order('createdAt', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 },
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      data,
      total: count,
    }),
    { status: 200 },
  );
}
