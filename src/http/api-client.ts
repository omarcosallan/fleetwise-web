import { getCookie } from 'cookies-next'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let token

        if (typeof window === 'undefined') {
          const { cookies } = await import('next/headers')
          const cookieStore = await cookies()
          token = cookieStore.get(process.env.TOKEN_NAME!)?.value
        } else {
          token = getCookie(process.env.NEXT_PUBLIC_TOKEN_NAME!)
        }

        if (token != null && !(token === '')) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
