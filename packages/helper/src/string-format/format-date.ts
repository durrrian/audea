export function formatDate(date: Date, type: 'short' | 'long', withTime = false) {
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    dateStyle: type,
    timeStyle: type === 'long' && withTime ? 'medium' : undefined,
  }).format(date)
}
