import { Text } from '@ignite-ui/react'
import { Calendar } from '../../../../../../../components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export function CalendarStep() {
  const isDaySelected = true
  return (
    <Container isTimePickerOpen={isDaySelected}>
      <Calendar />

      {isDaySelected && (
        <TimePicker>
          <TimePickerHeader>
            Sábado, <span>14 de janeiro</span>
          </TimePickerHeader>
          <TimePickerList>
            {Array.from(Array(11).keys()).map((t, i) => {
              return (
                <TimePickerItem key={i}>
                  <Text>{t + 8}:00h</Text>
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
