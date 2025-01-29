import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { signInWithPassword } from '@/http/sign-in-with-password'

import { type Role } from '@/lib/casl'

import { decode, type JwtPayload } from 'jsonwebtoken'
import { refreshTokens } from '@/http/refresh-token'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'E-mail', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials

        const res = await signInWithPassword({
          email: email as string,
          password: password as string,
        })

        if (res) {
          const user = res.user

          return {
            ...user,
            image: user.avatarUrl,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          }
        }

        throw new Error('Não autorizado.')
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.id = user.id
        token.roles = user.roles
      }

      if (token.accessToken) {
        const decoded = decode(token.accessToken as string) as JwtPayload
        const exp = decoded?.exp ? decoded.exp : 0

        if (Date.now() >= exp * 1000 || trigger === 'update') {
          try {
            const refreshed = await refreshTokens(token.refreshToken as string)

            token.accessToken = refreshed.accessToken
            token.refreshToken = refreshed.refreshToken
            token.name = refreshed.user.name
            token.email = refreshed.user.email
            token.roles = refreshed.user.roles
          } catch {
            return token
          }
        }
      }

      return token
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string
      session.user.refreshToken = token.refreshToken as string

      session.user.id = token.id as string
      session.user.roles = token.roles as Role[]
      session.user.name = token.name
      session.user.email = token.email as string

      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user

      const isOnPublicPages = nextUrl.pathname.startsWith('/auth')
      const isOnPrivatePages = !isOnPublicPages

      if (isOnPublicPages && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl))
      }

      if (isOnPrivatePages && !isLoggedIn) {
        return false
      }

      return true
    },
  },
})
