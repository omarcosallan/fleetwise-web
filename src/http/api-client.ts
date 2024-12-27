import { getCookie } from 'cookies-next'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: 'http://localhost:8080',
  hooks: {
    beforeRequest: [
      async (request) => {
        // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
        let token

        if (typeof window === 'undefined') {
          const { cookies } = await import('next/headers')
          const cookieStore = await cookies()
          token = cookieStore.get(process.env.TOKEN_NAME!)?.value
        } else {
          token = getCookie(process.env.TOKEN_NAME!)
        }

        if (token != null && !(token === '')) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
