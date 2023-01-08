import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  export interface User {
    id: string
    fullname: string
    email: string
    username: strigng
    avatar_url: string
  }
}
