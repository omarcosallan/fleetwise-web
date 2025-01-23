import { auth } from '@/auth/auth'

import ky from 'ky'

export const api = ky.create({
  prefixUrl: process.env.API_URL! || process.env.NEXT_PUBLIC_API_URL!,
  hooks: {
    beforeRequest: [
      async (request) => {
        const session = await auth()

        if (session?.user.accessToken) {
          request.headers.set(
            'Authorization',
            `Bearer ${session?.user.accessToken}`,
          )
        }
      },
    ],
  },
})
