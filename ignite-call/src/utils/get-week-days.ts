interface GetWeekDaysProps {
  short?: boolean
}

export function getWeekDays({ short = false }: GetWeekDaysProps = {}) {
  const formatter = new Intl.DateTimeFormat('pt-br', { weekday: 'long' })

  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // In JS month starts at 0 so January = 0, February = 1 and so on.

  if (short) {
    return Array.from(Array(7).keys())
      .map((day) => formatter.format(new Date(Date.UTC(year, month, day))))
      .map((weekDay) => weekDay.substring(0, 3).toUpperCase())
  }

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(year, month, day))))
    .map((weekDay) =>
      weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1)),
    )
}
