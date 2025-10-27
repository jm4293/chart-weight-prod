import { serverClient } from '@/lib/supabase';
import { NextRequest } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const supabase = await serverClient();

  const { error } = await supabase.from('weight').delete().eq('id', id);

  if (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
      },
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
