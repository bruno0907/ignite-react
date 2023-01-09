import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  export interface User {
    id: string
    fullname: string
    email: string
    username: string
    avatar_url: string
    updated_at?: Date | null
  }
}
