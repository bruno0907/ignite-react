import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
import { prisma } from '../../../lib/prima'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req?.method !== 'POST') {
    return res.status(405).end()
  }

  const { username, fullname } = req.body

  const usernameAlreadyInUse = await prisma.user.findFirst(username)

  if (usernameAlreadyInUse) {
    return res.status(404).json({ message: 'Username already in use' })
  }

  const user = await prisma.user.create({
    data: {
      username,
      fullname,
    },
  })

  setCookie({ res }, '@igniteCall:UserId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
  return res.status(201).json(user)
}
