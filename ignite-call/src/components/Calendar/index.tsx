import { Text } from '@ignite-ui/react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { getWeekDays } from '../../utils/get-week-days'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

export function Calendar() {
  const weekDays = getWeekDays({ short: true })
  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          Janeiro <span>2023</span>
        </CalendarTitle>
        <CalendarActions>
          <button>
            <CaretLeft />
          </button>
          <button>
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
          {Array.from({ length: 4 }).map((_, i) => {
            return (
              <tr key={i}>
                {Array.from({ length: 7 }).map((_, i) => {
                  return (
                    <td key={i}>
                      <CalendarDay>{i}</CalendarDay>
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
