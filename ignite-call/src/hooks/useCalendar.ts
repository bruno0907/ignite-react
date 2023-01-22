import { useMemo } from 'react'
import { Dayjs } from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/axios'

interface CalendarWeek {
  week: number
  days: Array<{
    date: Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

interface BlockedDatesProps {
  blockedWeekDays: number[]
}

interface UseCalendarProps {
  currentDate: Dayjs
  username: string
}

export function useCalendar({
  currentDate,
  username,
}: UseCalendarProps): [
  currentMonth: string,
  currentYear: string,
  calendarWeek: CalendarWeeks,
] {
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const { data: blockedDates } = useQuery<BlockedDatesProps>(
    ['blocked-dates', currentDate.get('year'), currentDate.get('month')],
    async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('month'),
        },
      })

      return response.data
    },
  )

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    })
      .map((_, i) => currentDate.set('date', i + 1))
      .map((date) => {
        const isPastDate = date.endOf('day').isBefore(new Date())
        const isDateBlocked =
          blockedDates?.blockedWeekDays.includes(date.get('day')) ?? false
        return {
          date,
          disabled: isPastDate || isDateBlocked,
        }
      })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({ length: firstWeekDay })
      .map((_, i) => currentDate.subtract(i + 1, 'day'))
      .reverse()
      .map((date) => ({ date, disabled: true }))

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    })
      .map((_, i) => lastDayInCurrentMonth.add(i + 1, 'day'))
      .map((date) => ({ date, disabled: true }))

    const calendarDays = [
      ...previousMonthFillArray,
      ...daysInMonthArray,
      ...nextMonthFillArray,
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }
        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDates])

  return [currentMonth, currentYear, calendarWeeks]
}
