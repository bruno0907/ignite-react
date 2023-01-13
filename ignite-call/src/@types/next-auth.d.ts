import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface User {
    id: string
    fullname: string
    email: string
    username: string
    avatar_url: string
    bio: string;
    updated_at?: Date | null
  }

  interface Session {
    user: User
  }
}
