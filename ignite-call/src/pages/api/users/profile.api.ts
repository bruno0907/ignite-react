import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession as getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '../../../lib/prima'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req?.method !== 'POST') {
      return res.status(405).end()
    }

    const session = await getServerSession(
      req,
      res,
      buildNextAuthOptions(req, res),
    )

    if (!session) {
      return res.status(401).end()
    }

    const { bio } = updateProfileBodySchema.parse(req.body)

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        bio,
        updated_at: new Date(),
      },
    })

    return res.status(204).end()
  } catch (error) {
    return res.status(500).json({ error })
  }
}
