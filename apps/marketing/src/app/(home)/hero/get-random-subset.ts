export function getRandomSubset<T>(array: T[], subsetSize: number) {
  if (subsetSize > array.length) {
    throw new Error('Subset size cannot be greater than the array length')
  }

  const subset = []
  const copyOfArray = [...array] // Create a copy of the original array to avoid modifying it

  for (let i = 0; i < subsetSize; i++) {
    const randomIndex = Math.floor(Math.random() * copyOfArray.length)
    const selectedItem = copyOfArray.splice(randomIndex, 1)[0]
    subset.push(selectedItem)
  }

  return subset
}
