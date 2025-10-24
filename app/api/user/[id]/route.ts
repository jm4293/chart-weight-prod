import { serverClient } from '@/lib/supabase';
import { SESSION_TOKEN_NAME } from '@/shared/const';
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
    .single();

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

  const { data, error } = await supabase
    .from('user')
    .update(body)
    .eq('id', id)
    .single();

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

  const { data, error } = await supabase
    .from('user')
    .delete()
    .eq('id', id)
    .single();

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
