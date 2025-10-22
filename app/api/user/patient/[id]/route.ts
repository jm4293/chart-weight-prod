import { serverClient } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', id)
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
