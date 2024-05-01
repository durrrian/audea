/**
 * Get the formatted Rupiah from a number.
 * Sesuai KBBI
 *
 * Example:
 * 500000 -> Rp500.000
 */

export function rupiah(number: number) {
  return number
    .toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
    .replace(/\s/g, '')
}
