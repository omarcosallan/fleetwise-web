import { auth } from '@/auth/auth'
import { getSession } from 'next-auth/react'

import ky from 'ky'

export const api = ky.create({
  prefixUrl: process.env.API_URL! || process.env.NEXT_PUBLIC_API_URL!,
  hooks: {
    beforeRequest: [
      async (request) => {
        const isServer = typeof window === 'undefined'
        const session = isServer ? await auth() : await getSession()
        const token = session?.user.accessToken

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
