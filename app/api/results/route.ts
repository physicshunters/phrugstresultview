import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import Papa from "papaparse"

export async function GET() {
  try {
    // Get the public directory path
    const publicDir = path.join(process.cwd(), "public")

    // Read all files in the public directory
    const files = await fs.readdir(publicDir)

    // Filter for CSV files that match the modeltest pattern
    const csvFiles = files.filter(
      (file) => file.toLowerCase().startsWith("modeltest") && file.toLowerCase().endsWith(".csv"),
    )

    if (csvFiles.length === 0) {
      return NextResponse.json({ error: "No model test CSV files found in public directory" }, { status: 404 })
    }

    // Read and parse each CSV file
    const allResults: any[] = []

    for (const file of csvFiles) {
      const filePath = path.join(publicDir, file)
      const fileContent = await fs.readFile(filePath, "utf8")

      // Parse CSV content
      const parseResult = Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true, // Automatically convert numeric values
      })

      if (parseResult.data && Array.isArray(parseResult.data)) {
        // Process each row based on the actual structure
        const processedData = parseResult.data.map((row: any, index) => {
          // Extract model test number from filename if not in data
          const modelTestMatch = file.match(/modeltest(\d+)/i)
          const modelTestNumber = modelTestMatch ? Number.parseInt(modelTestMatch[1]) : 0

          // Format mobile number - ensure it's a string
          let mobileStr = row.Mobile ? String(row.Mobile).trim() : ""

          // Remove any non-digit characters
          mobileStr = mobileStr.replace(/\D/g, "")

          // If it's 10 digits, add a leading "0"
          if (mobileStr.length === 10) {
            mobileStr = "0" + mobileStr
          }

          // Create a standardized object with all required fields
          return {
            Position: row.Position || index + 1,
            Roll: row.Roll || 0,
            Mobile: mobileStr,
            Name: row.Name || "",
            College: row.College || "",
            HSC: row.HSC || "",
            Model_Test: row.Model_Test || row["Model Test"] || modelTestNumber,

            // Physics data
            PHY_true: extractNumber(row.PHY_true) || extractTrueCount(row.Physics),
            PHY_false: extractNumber(row.PHY_false) || extractFalseCount(row.Physics),
            PHY_marks: extractNumber(row.PHY_marks) || extractMarks(row.Physics),

            // Chemistry data
            CHEM_true: extractNumber(row.CHEM_true) || extractTrueCount(row.Chemistry),
            CHEM_false: extractNumber(row.CHEM_false) || extractFalseCount(row.Chemistry),
            CHEM_marks: extractNumber(row.CHEM_marks) || extractMarks(row.Chemistry),

            // ICT data
            ICT_true: extractNumber(row.ICT_true) || extractTrueCount(row.ICT),
            ICT_false: extractNumber(row.ICT_false) || extractFalseCount(row.ICT),
            ICT_marks: extractNumber(row.ICT_marks) || extractMarks(row.ICT),

            // Math/Bio data
            MATH_BIO_true: extractNumber(row.MATH_BIO_true) || extractTrueCount(row.Math),
            MATH_BIO_false: extractNumber(row.MATH_BIO_false) || extractFalseCount(row.Math),
            MATH_BIO_marks: extractNumber(row.MATH_BIO_marks) || extractMarks(row.Math),

            // Biology data
            BIO_true: extractNumber(row.BIO_true) || extractTrueCount(row.Biology),
            BIO_false: extractNumber(row.BIO_false) || extractFalseCount(row.Biology),
            BIO_marks: extractNumber(row.BIO_marks) || extractMarks(row.Biology),

            // Math data (if separate from Math/Bio)
            MATH_true: extractNumber(row.MATH_true) || 0,
            MATH_false: extractNumber(row.MATH_false) || 0,
            MATH_marks: extractNumber(row.MATH_marks) || 0,

            // Other fields
            PHY_CHEM_ICT: extractNumber(row.PHY_CHEM_ICT) || extractNumber(row["PHY+CHEM+ICT"]),
            Best_Optional: row.Best_Optional || row["Best Optional"] || "",
            Total: extractNumber(row.Total),
            Time: row.Time || "",
            Total_Wrong: extractNumber(row.Total_Wrong) || extractNumber(row["Total Wrong"]),
          }
        })

        // Add the processed data to our results array
        allResults.push(...processedData)
      }
    }

    return NextResponse.json(allResults)
  } catch (error) {
    console.error("Error reading CSV files:", error)
    return NextResponse.json({ error: "Failed to read CSV files" }, { status: 500 })
  }
}

// Helper function to extract numbers from various formats
function extractNumber(value: any): number {
  if (value === undefined || value === null) return 0
  if (typeof value === "number") return value
  if (typeof value === "string") {
    // Try to extract a number from the string
    const match = value.match(/(\d+(\.\d+)?)/)
    return match ? Number.parseFloat(match[0]) : 0
  }
  return 0
}

// Helper function to extract true count from combined format (e.g., "23T / 2F")
function extractTrueCount(value: any): number {
  if (!value || typeof value !== "string") return 0
  const match = value.match(/(\d+)T/)
  return match ? Number.parseInt(match[1]) : 0
}

// Helper function to extract false count from combined format
function extractFalseCount(value: any): number {
  if (!value || typeof value !== "string") return 0
  const match = value.match(/(\d+)F/)
  return match ? Number.parseInt(match[1]) : 0
}

// Helper function to extract marks from combined format or separate line
function extractMarks(value: any): number {
  if (!value) return 0
  if (typeof value === "number") return value
  if (typeof value === "string") {
    // Check if it's a combined format with marks on a new line
    const lines = value.split("\n")
    if (lines.length > 1) {
      return extractNumber(lines[1])
    }
    // Otherwise try to find a number
    return extractNumber(value)
  }
  return 0
}
