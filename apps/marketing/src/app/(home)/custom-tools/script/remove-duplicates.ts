export function removeDuplicates<T>(arr: T[], prop: keyof T) {
  const seen = new Set()
  return arr.filter((item) => {
    const key = item[prop]
    return seen.has(key) ? false : seen.add(key)
  })
}
