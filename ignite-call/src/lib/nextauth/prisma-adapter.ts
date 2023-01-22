import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import { Adapter } from 'next-auth/adapters'
import { destroyCookie, parseCookies } from 'nookies'
import { prisma } from '../prisma'

/** @return { import("next-auth/adapters").Adapter } */
export function PrismaAdapter(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): Adapter {
  return {
    async createUser(user) {
      const { '@igniteCall:UserId': userIdOnCookies } = parseCookies({ req })

      const response = await prisma.user.update({
        where: {
          id: userIdOnCookies,
        },
        data: {
          fullname: user.fullname,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      destroyCookie({ res }, '@igniteCall:UserId', {
        path: '/',
      })

      return {
        id: response.id,
        fullname: response.fullname,
        username: response.username,
        email: response.email!,
        emailVerified: null,
        avatar_url: response.avatar_url!,
      }
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          expires,
          userId,
          session_token: sessionToken,
        },
      })

      return {
        expires,
        userId,
        sessionToken,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) return null

      return {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) return null

      return {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) return null

      const { user } = account

      return {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },

    async getSessionAndUser(sessionToken) {
      const sessionAndUser = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!sessionAndUser) return null

      const { user, ...session } = sessionAndUser

      return {
        session: {
          expires: session.expires,
          sessionToken: session.session_token,
          userId: session.userId,
        },
        user: {
          id: user.id,
          avatar_url: user.avatar_url!,
          email: user.email!,
          emailVerified: null,
          fullname: user.fullname,
          username: user.username,
          updated_at: user.updated_at,
        },
      }
    },

    async updateUser(user) {
      const response = await prisma.user.update({
        where: {
          id: user.id!,
        },
        data: {
          fullname: user.fullname,
          email: user.email,
          avatar_url: user.avatar_url,
          updated_at: new Date(),
        },
      })

      return {
        id: response.id,
        fullname: response.fullname,
        username: response.username,
        email: response.email!,
        emailVerified: null,
        avatar_url: response.avatar_url!,
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const response = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          userId,
          session_token: sessionToken,
        },
      })

      return {
        expires: response.expires,
        sessionToken: response.session_token,
        userId: response.userId,
      }
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          type: account.type,
          access_token: account.access_token,
          expires_at: account.expires_at,
          user_id: account.userId,
          id_token: account.id_token,
          refresh_token: account.refresh_token,
          scope: account.scope,
          session_state: account.session_state,
          token_type: account.token_type,
        },
      })
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },
  }
}
