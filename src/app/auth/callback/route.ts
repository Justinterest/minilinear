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

  // 在 Vercel 部署时，`requestUrl.origin` 可能无法获取正确的 host。
  // 此时，我们可以使用 Vercel 提供的 `VERCEL_URL` 环境变量来构造正确的重定向地址。
  const origin = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : requestUrl.origin

  // 重定向到主页
  return NextResponse.redirect(origin)
} 