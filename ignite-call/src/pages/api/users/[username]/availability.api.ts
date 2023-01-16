import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prima'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  const { date } = req.query

  if (!date) {
    return res.status(400).json({ message: 'Date not provided.' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User does not exists.' })
  }

  const referenceDate = dayjs(String(date))

  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    console.log(isPastDate)
    return res.json({ rangeOfIntervals: [], availableIntervals: [] })
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability) {
    return res.json({ rangeOfIntervals: [], availableIntervals: [] })
  }

  const {
    time_start_in_minutes: timeStartInMinutes,
    time_end_in_minutes: timeEndInMinutes,
  } = userAvailability

  /* Today our app domain allow intervals from hour to hour.
  If one day changes to 15 to 15min or 30 to 30min the convertion to hour logic must change to avoid bugs.
  */
  const startHour = timeStartInMinutes / 60
  const endHour = timeEndInMinutes / 60

  const rangeOfIntervals = Array.from({ length: endHour - startHour }).map(
    (_, i) => startHour + i,
  )

  const blockedIntervals = await prisma.scheduling.findMany({
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  const availableIntervals = rangeOfIntervals.filter((interval) => {
    return !blockedIntervals.some(
      (blocked) => blocked.date.getHours() === interval,
    )
  })

  return res.json({ rangeOfIntervals, availableIntervals })
}
