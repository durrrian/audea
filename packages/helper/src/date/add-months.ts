export function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date)
  const currentMonth = newDate.getMonth()

  newDate.setMonth(currentMonth + months)

  return newDate
}
