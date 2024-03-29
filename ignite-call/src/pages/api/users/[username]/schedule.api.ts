import dayjs from 'dayjs'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { getGoogleOAuthtoken } from '../../../../lib/google'
import { prisma } from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User does not exists.' })
  }

  const createScheduleBodySchema = z.object({
    name: z.string().trim(),
    email: z.string().trim(),
    observations: z.string().trim(),
    date: z.string().datetime().trim(),
  })

  const { name, email, observations, date } = createScheduleBodySchema.parse(
    req.body,
  )

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({
      message: 'Date is in the past.',
    })
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return res.status(400).json({
      message: 'Time already scheduled',
    })
  }

  const auth = await getGoogleOAuthtoken(user.id)

  if (!auth) {
    return res.status(400).json({
      message: 'Google Auth Error.',
    })
  }

  const calendar = google.calendar({
    version: 'v3',
    auth,
  })

  await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Ignite Call: ${name}`,
      description: observations,
      start: {
        dateTime: schedulingDate.format(),
      },
      end: {
        dateTime: schedulingDate.add(1, 'hour').format(),
      },
      attendees: [{ email, displayName: name }],
      conferenceData: {
        createRequest: {
          requestId: `${email}@${date}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    },
  })

  await prisma.scheduling.create({
    data: {
      date: schedulingDate.toDate(),
      name,
      email,
      observations,
      user_id: user.id,
    },
  })

  return res.status(201).end()
}
