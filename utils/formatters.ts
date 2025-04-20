/**
 * Formats and masks mobile numbers:
 * 1. Ensures 11 digits by adding a leading "0" if needed
 * 2. Masks the middle 4 digits with asterisks
 * Example: 1712345678 -> 0171****678
 */
export function maskMobileNumber(mobileNumber: string | number): string {
  if (!mobileNumber) return "-"

  // Convert to string if it's not already
  let mobileStr = String(mobileNumber).trim()

  // Remove any non-digit characters
  mobileStr = mobileStr.replace(/\D/g, "")

  // If it's 10 digits, add a leading "0"
  if (mobileStr.length === 10) {
    mobileStr = "0" + mobileStr
  }

  // If it's not 11 digits after processing, return as is
  if (mobileStr.length !== 11) {
    return mobileStr
  }

  // Mask the middle 4 digits
  const firstPart = mobileStr.substring(0, 4)
  const lastPart = mobileStr.substring(8)

  return `${firstPart}****${lastPart}`
}
