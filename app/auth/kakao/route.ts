import { serverClient } from '@/utils/supabase';
import { NextResponse } from 'next/server';

// The client you created from the Server-Side Auth instructions
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/auth';

  if (code) {
    console.log('code', code);

    const supabase = await serverClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect('http://localhost:3000' + next);
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}
