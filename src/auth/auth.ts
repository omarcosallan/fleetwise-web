import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { signInWithPassword } from '@/http/sign-in-with-password'

import { decode, type JwtPayload } from 'jsonwebtoken'

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

        const user = res.user

        if (res.accessToken && res.refreshToken) {
          return {
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
            image: user.avatarUrl,
            ...user,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }

      if (token.accessToken) {
        const decoded = decode(token.accessToken as string) as JwtPayload
        const exp = decoded?.exp ? decoded.exp : 0

        if (Date.now() >= exp * 1000) {
          try {
            const response = await fetch(
              `${process.env.API_URL! || process.env.NEXT_PUBLIC_API_URL!}auth/refresh`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token.refreshToken }),
              },
            )

            const refreshedTokens = await response.json()

            token.accessToken = refreshedTokens.accessToken
            token.refreshToken = refreshedTokens.refreshToken
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
