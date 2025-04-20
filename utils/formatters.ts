/**
 * Masks the middle 4 digits of an 11-digit mobile number
 * Example: 01712345678 -> 0171****678
 */
export function maskMobileNumber(mobileNumber: string): string {
  if (!mobileNumber || mobileNumber.length !== 11) {
    return mobileNumber
  }

  const firstPart = mobileNumber.substring(0, 4)
  const lastPart = mobileNumber.substring(8)

  return `${firstPart}****${lastPart}`
}
