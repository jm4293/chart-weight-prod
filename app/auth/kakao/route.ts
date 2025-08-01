import { serverClient } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cookieStore = await cookies();

  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await serverClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { user } = data;
      const { user_metadata } = user;
      const { email, name } = user_metadata;

      cookieStore.set('__SE', JSON.stringify({ email, name }), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      return NextResponse.redirect('http://localhost:3000/auth');
      // return NextResponse.redirect('https://chart-weight-prod.vercel.app/auth');
    }
  }

  return NextResponse.redirect('http://localhost:3000/login');
  // return NextResponse.redirect('https://chart-weight-prod.vercel.app/login');
}
