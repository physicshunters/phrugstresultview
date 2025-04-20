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
        // Validate each row before adding to results
        const validatedData = parseResult.data.map((row: any) => {
          // Ensure all required fields exist and have proper types
          return {
            Position: typeof row.Position === "number" ? row.Position : Number.parseInt(row.Position) || 0,
            Roll: typeof row.Roll === "number" ? row.Roll : Number.parseInt(row.Roll) || 0,
            Mobile: typeof row.Mobile === "string" ? row.Mobile : String(row.Mobile || ""),
            Name: typeof row.Name === "string" ? row.Name : String(row.Name || ""),
            College: typeof row.College === "string" ? row.College : String(row.College || ""),
            HSC: typeof row.HSC === "string" ? row.HSC : String(row.HSC || ""),
            Model_Test: typeof row.Model_Test === "number" ? row.Model_Test : Number.parseInt(row.Model_Test) || 0,
            PHY_true: typeof row.PHY_true === "number" ? row.PHY_true : Number.parseInt(row.PHY_true) || 0,
            PHY_false: typeof row.PHY_false === "number" ? row.PHY_false : Number.parseInt(row.PHY_false) || 0,
            PHY_marks: typeof row.PHY_marks === "number" ? row.PHY_marks : Number.parseInt(row.PHY_marks) || 0,
            CHEM_true: typeof row.CHEM_true === "number" ? row.CHEM_true : Number.parseInt(row.CHEM_true) || 0,
            CHEM_false: typeof row.CHEM_false === "number" ? row.CHEM_false : Number.parseInt(row.CHEM_false) || 0,
            CHEM_marks: typeof row.CHEM_marks === "number" ? row.CHEM_marks : Number.parseInt(row.CHEM_marks) || 0,
            ICT_true: typeof row.ICT_true === "number" ? row.ICT_true : Number.parseInt(row.ICT_true) || 0,
            ICT_false: typeof row.ICT_false === "number" ? row.ICT_false : Number.parseInt(row.ICT_false) || 0,
            ICT_marks: typeof row.ICT_marks === "number" ? row.ICT_marks : Number.parseInt(row.ICT_marks) || 0,
            MATH_BIO_true:
              typeof row.MATH_BIO_true === "number" ? row.MATH_BIO_true : Number.parseInt(row.MATH_BIO_true) || 0,
            MATH_BIO_false:
              typeof row.MATH_BIO_false === "number" ? row.MATH_BIO_false : Number.parseInt(row.MATH_BIO_false) || 0,
            MATH_BIO_marks:
              typeof row.MATH_BIO_marks === "number" ? row.MATH_BIO_marks : Number.parseInt(row.MATH_BIO_marks) || 0,
            BIO_true: typeof row.BIO_true === "number" ? row.BIO_true : Number.parseInt(row.BIO_true) || 0,
            BIO_false: typeof row.BIO_false === "number" ? row.BIO_false : Number.parseInt(row.BIO_false) || 0,
            BIO_marks: typeof row.BIO_marks === "number" ? row.BIO_marks : Number.parseInt(row.BIO_marks) || 0,
            MATH_true: typeof row.MATH_true === "number" ? row.MATH_true : Number.parseInt(row.MATH_true) || 0,
            MATH_false: typeof row.MATH_false === "number" ? row.MATH_false : Number.parseInt(row.MATH_false) || 0,
            MATH_marks: typeof row.MATH_marks === "number" ? row.MATH_marks : Number.parseInt(row.MATH_marks) || 0,
            PHY_CHEM_ICT:
              typeof row.PHY_CHEM_ICT === "number" ? row.PHY_CHEM_ICT : Number.parseInt(row.PHY_CHEM_ICT) || 0,
            Best_Optional: typeof row.Best_Optional === "string" ? row.Best_Optional : String(row.Best_Optional || ""),
            Total: typeof row.Total === "number" ? row.Total : Number.parseInt(row.Total) || 0,
            Time: typeof row.Time === "string" ? row.Time : String(row.Time || ""),
            Total_Wrong: typeof row.Total_Wrong === "number" ? row.Total_Wrong : Number.parseInt(row.Total_Wrong) || 0,
          }
        })

        // Add the validated data to our results array
        allResults.push(...validatedData)
      }
    }

    return NextResponse.json(allResults)
  } catch (error) {
    console.error("Error reading CSV files:", error)
    return NextResponse.json({ error: "Failed to read CSV files" }, { status: 500 })
  }
}
