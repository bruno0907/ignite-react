import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { api } from '../lib/axios'

interface UseAvailabilityInput {
  username: string
  selectedDate: Date | null
}

interface AvailabilityProps {
  rangeOfIntervals: number[]
  availableIntervals: number[]
}

export const useAvailability = ({
  username,
  selectedDate,
}: UseAvailabilityInput) => {
  const selectedDateQuery = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  return useQuery<AvailabilityProps>(
    ['availability', selectedDateQuery],
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
}
