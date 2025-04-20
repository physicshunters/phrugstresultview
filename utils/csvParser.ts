import Papa from "papaparse"
import type { StudentResult } from "@/types/types"

export const parseCSVFiles = async (files: File[]): Promise<StudentResult[]> => {
  const parsePromises = files.map((file) => {
    return new Promise<StudentResult[]>((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true, // Automatically convert numeric values
        complete: (results) => {
          // Type assertion to handle the parsed data
          const parsedData = results.data as StudentResult[]
          resolve(parsedData)
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  })

  try {
    // Wait for all files to be parsed
    const resultsArrays = await Promise.all(parsePromises)

    // Combine all results into a single array
    return resultsArrays.flat()
  } catch (error) {
    console.error("Error parsing CSV files:", error)
    throw error
  }
}
