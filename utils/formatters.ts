/**
 * Masks the middle 4 digits of an 11-digit mobile number
 * Example: 01712345678 -> 0171****678
 */
export function maskMobileNumber(mobileNumber: string): string {
  if (!mobileNumber || typeof mobileNumber !== "string") {
    return String(mobileNumber || "")
  }

  // Convert to string if it's not already
  const mobileStr = String(mobileNumber)

  if (mobileStr.length !== 11) {
    return mobileStr
  }

  const firstPart = mobileStr.substring(0, 4)
  const lastPart = mobileStr.substring(8)

  return `${firstPart}****${lastPart}`
}
