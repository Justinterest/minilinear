import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    await supabase.auth.exchangeCodeForSession(code)
  }

  const host = request.headers.get('host')

  console.log("host", host);
  console.log("requestUrl.origin", requestUrl.origin);
  console.log("requestUrl", requestUrl);
  console.log("request.headers", request.headers);

  const origin = host ? `https://${host}` : requestUrl.origin

  return NextResponse.redirect(origin)
} 