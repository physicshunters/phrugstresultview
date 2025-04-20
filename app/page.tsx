"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ResultsTable from "@/components/ResultsTable"
import LoadingSpinner from "@/components/LoadingSpinner"
import type { StudentResult } from "@/types/types"

export default function Home() {
  const [results, setResults] = useState<StudentResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedModelTest, setSelectedModelTest] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [availableModelTests, setAvailableModelTests] = useState<string[]>([])

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/results")

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch results")
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from API")
        }

        setResults(data)

        // Extract unique model test values
        const modelTests = Array.from(new Set(data.map((item: StudentResult) => item.Model_Test.toString())))
        setAvailableModelTests(modelTests)
      } catch (error) {
        console.error("Error fetching results:", error)
        setError(error instanceof Error ? error.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter results based on selected model test and search query
  const filteredResults = results.filter((result) => {
    const matchesModelTest = selectedModelTest === "all" || result.Model_Test.toString() === selectedModelTest

    const matchesSearch =
      searchQuery === "" ||
      result.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.Roll.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.College.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesModelTest && matchesSearch
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        selectedModelTest={selectedModelTest}
        setSelectedModelTest={setSelectedModelTest}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        availableModelTests={availableModelTests}
      />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Results</h2>
              <p className="text-gray-700">{error}</p>
              <p className="text-gray-600 mt-4">
                Please make sure you have CSV files in the public directory with names like modeltest01.csv,
                modeltest02.csv, etc.
              </p>
            </div>
          ) : (
            <>
              {results.length > 0 ? (
                <div className="mt-4">
                  <div className="bg-white p-4 rounded-lg shadow mb-4">
                    <p className="text-gray-700">
                      Showing <span className="font-semibold">{filteredResults.length}</span> out of{" "}
                      <span className="font-semibold">{results.length}</span> total students
                    </p>
                  </div>

                  <ResultsTable results={filteredResults} />
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">No Results Available</h2>
                  <p className="text-gray-600">
                    No test results were found in the CSV files. Please check that your CSV files are properly
                    formatted.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
