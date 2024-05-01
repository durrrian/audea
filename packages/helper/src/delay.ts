/**
 * Resolving a promise after a certain
 * amount of time
 */
export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
