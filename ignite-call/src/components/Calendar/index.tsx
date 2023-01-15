import { Text } from '@ignite-ui/react'
import dayjs, { Dayjs } from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { getWeekDays } from '../../utils/get-week-days'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

interface CalendarDayProps {
  day: Dayjs
  disabled: boolean
}
interface CalendarWeeksProps {
  week: number
  days: CalendarDayProps[]
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => dayjs().set('date', 1))

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

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonth)
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')
    setCurrentDate(nextMonth)
  }

  const weekDays = getWeekDays({ short: true })

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Mês anterior">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Próximo mês">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {weekDays.map((day) => (
              <th key={day}>
                <Text>{day}.</Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ day, disabled }) => {
                  return (
                    <td key={day.date()}>
                      <CalendarDay disabled={disabled}>
                        {day.date()}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
