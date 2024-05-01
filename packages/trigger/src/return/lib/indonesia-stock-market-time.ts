/**
 * Get Indonesia Stock Market Time.
 *
 * Based on our database which is weekday at 9:00 UTC Time (16:00 WIB).
 * The time is based on the market closed
 */
export function indonesiaStockMarketTime(date?: Date) {
  // Create a Date object for the current time
  const currentDate = date ?? new Date()

  // Get the current day of the week (0 = Sunday, 6 = Saturday)
  const currentDayOfWeek = currentDate.getUTCDay()

  // Check if it's a weekend (Saturday or Sunday)
  if (currentDayOfWeek === 0 || currentDayOfWeek === 6) {
    // It's a weekend, so go back to the previous Friday at 16:00 WIB
    currentDate.setUTCDate(currentDate.getUTCDate() - (currentDayOfWeek === 0 ? 2 : 1))
    currentDate.setUTCHours(9, 0, 0, 0)
  } else if (currentDayOfWeek === 1 && currentDate.getUTCHours() < 9) {
    // Monday but market has not closed yet
    currentDate.setUTCDate(currentDate.getUTCDate() - 3)
    currentDate.setUTCHours(9, 0, 0, 0)
  } else {
    // Check if the current time is below 16:00 WIB
    if (currentDate.getUTCHours() < 9) {
      // It's before 17:00 WIB, so go back to the previous day at 16:00 WIB
      currentDate.setUTCDate(currentDate.getUTCDate() - 1)
      currentDate.setUTCHours(9, 0, 0, 0)
    } else {
      // It's after 17:00 WIB, return the current date with time 16:00 WIB
      currentDate.setUTCHours(9, 0, 0, 0)
    }
  }

  // Convert the date to a string with the WIB time zone
  // const options = { timeZone: 'Asia/Jakarta', hour12: false };
  // return currentDate.toLocaleString('en-US', options);

  return currentDate
}
