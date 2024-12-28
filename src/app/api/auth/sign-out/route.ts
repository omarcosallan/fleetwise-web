import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/auth/sign-in'

  const allCookies = await cookies()
  allCookies.delete('fleet-wise-cookies-session-token')

  return NextResponse.redirect(redirectUrl)
}
