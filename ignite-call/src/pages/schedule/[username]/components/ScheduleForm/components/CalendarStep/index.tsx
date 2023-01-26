import { useState } from 'react'
import { useRouter } from 'next/router'
import { Text } from '@ignite-ui/react'
import { Calendar } from '../../../../../../../components/Calendar'
import { useAvailability } from '../../../../../../../hooks/useAvailability'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import dayjs from 'dayjs'

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const router = useRouter()
  const username = String(router.query.username)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const { data: availability } = useAvailability({
    username,
    selectedDate,
  })

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateWithTime)
  }

  return (
    <Container isTimePickerOpen={!!selectedDate}>
      <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      {selectedDate && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay}, <span>{describedDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            {availability?.rangeOfIntervals.map((interval) => {
              const isDisabled =
                !availability.availableIntervals.includes(interval)
              return (
                <TimePickerItem
                  key={interval}
                  disabled={isDisabled}
                  onClick={() => handleSelectTime(interval)}
                >
                  <Text>{interval}:00h</Text>
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
