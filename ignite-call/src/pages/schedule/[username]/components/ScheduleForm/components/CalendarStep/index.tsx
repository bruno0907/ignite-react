import { useState } from 'react'
import { useRouter } from 'next/router'
import { Text } from '@ignite-ui/react'
import { api } from '../../../../../../../lib/axios'
import { Calendar } from '../../../../../../../components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'

interface AvailabilityProps {
  rangeOfIntervals: number[]
  availableIntervals: number[]
}

export function CalendarStep() {
  const router = useRouter()
  const username = String(router.query.username)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateQuery = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<AvailabilityProps>(
    ['', selectedDateQuery],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })

      return response.data
    },
    {
      enabled: !!selectedDate,
    },
  )

  // useEffect(() => {
  //   if (!selectedDate) return

  //   api
  //     .get(`/users/${username}/availability`, {
  //       params: {
  //         date: dayjs(selectedDate).format('YYYY-MM-DD'),
  //       },
  //     })
  //     .then(({ data }) => setAvailability(data))
  //     .catch((e) => console.error(e))
  // }, [selectedDate, username])

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
                <TimePickerItem key={interval} disabled={isDisabled}>
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
