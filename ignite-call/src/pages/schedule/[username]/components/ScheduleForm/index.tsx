import { useState } from 'react'
import { CalendarStep } from './components/CalendarStep'
import { ConfirmStep } from './components/ConfirmStep'

export function ScheduleForm() {
  const [selectedDatetime, setSelectedDateTime] = useState<Date | null>(null)

  function handleCancelDateTimeConfirmation() {
    setSelectedDateTime(null)
  }

  if (!selectedDatetime) {
    return <CalendarStep onSelectDateTime={setSelectedDateTime} />
  }

  return (
    <ConfirmStep
      onCancelScheduling={handleCancelDateTimeConfirmation}
      schedulingDate={selectedDatetime}
    />
  )
}
