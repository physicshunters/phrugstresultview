import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import Papa from "papaparse"
import type { StudentResult } from "@/types/types"

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
    const allResults: StudentResult[] = []

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
        // Add the data to our results array
        allResults.push(...(parseResult.data as StudentResult[]))
      }
    }

    return NextResponse.json(allResults)
  } catch (error) {
    console.error("Error reading CSV files:", error)
    return NextResponse.json({ error: "Failed to read CSV files" }, { status: 500 })
  }
}
