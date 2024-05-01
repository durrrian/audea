/**
 * Get a proper contrast of a text color from a
 * HEX code background color.
 */

export function getTextColorFromBackground(backgroundColor: string) {
  let bgColor = backgroundColor
  if (backgroundColor.startsWith('#')) {
    bgColor = backgroundColor.slice(1)
  }
  // Parse the color components (red, green, and blue) in hexadecimal
  const r = parseInt(bgColor.slice(0, 2), 16)
  const g = parseInt(bgColor.slice(2, 4), 16)
  const b = parseInt(bgColor.slice(4, 6), 16)

  // Calculate the relative luminance of the background color
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Choose black or white text based on luminance
  return luminance > 0.5 ? '#1F365F' : '#FEFFF7'
}
