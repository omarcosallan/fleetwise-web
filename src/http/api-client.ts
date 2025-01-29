import { auth } from '@/auth/auth'

import ky from 'ky'
import { getSession } from 'next-auth/react'

export const api = ky.create({
  prefixUrl: process.env.API_URL! || process.env.NEXT_PUBLIC_API_URL!,
  hooks: {
    beforeRequest: [
      async (request) => {
        let token

        if (typeof window === 'undefined') {
          const session = await auth()

          if (session?.user.accessToken) {
            token = session?.user.accessToken
          }
        } else {
          const session = await getSession()

          if (session?.user.accessToken) {
            token = session?.user.accessToken
          }
        }

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
