import { useMemo } from 'react'
import { Dayjs } from 'dayjs'

interface CalendarDayProps {
  day: Dayjs
  disabled: boolean
}
interface CalendarWeeksProps {
  week: number
  days: CalendarDayProps[]
}

export function useCalendar(
  currentDate: Dayjs,
): [
  currentMonth: string,
  currentYear: string,
  calendarWeek: CalendarWeeksProps[],
] {
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    })
      .map((_, i) => currentDate.set('date', i + 1))
      .map((day) => ({ day, disabled: false }))

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({ length: firstWeekDay })
      .map((_, i) => currentDate.subtract(i + 1, 'day'))
      .reverse()
      .map((day) => ({ day, disabled: true }))

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    })
      .map((_, i) => lastDayInCurrentMonth.add(i + 1, 'day'))
      .map((day) => ({ day, disabled: true }))

    const calendarDays = [
      ...previousMonthFillArray,
      ...daysInMonthArray,
      ...nextMonthFillArray,
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeksProps[]>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          const newWeek = {
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          }
          weeks.push(newWeek)
        }
        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate])

  return [currentMonth, currentYear, calendarWeeks]
}
