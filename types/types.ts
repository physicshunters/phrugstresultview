export interface StudentResult {
  Position: number
  Roll: number
  Mobile: string
  Name: string
  College: string
  HSC?: string
  Model_Test: number | string
  PHY_true: number
  PHY_false: number
  PHY_marks: number
  CHEM_true: number
  CHEM_false: number
  CHEM_marks: number
  ICT_true: number
  ICT_false: number
  ICT_marks: number
  MATH_BIO_true: number
  MATH_BIO_false: number
  MATH_BIO_marks: number
  BIO_true: number
  BIO_false: number
  BIO_marks: number
  MATH_true?: number
  MATH_false?: number
  MATH_marks?: number
  PHY_CHEM_ICT: number
  Best_Optional: string
  Total: number
  Time: string
  Total_Wrong: number
}
