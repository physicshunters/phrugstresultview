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
  const [selectedModelTest, setSelectedModelTest] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [availableModelTests, setAvailableModelTests] = useState<string[]>([])

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/results")
        const data = await response.json()

        setResults(data)

        // Extract unique model test values
        const modelTests = Array.from(new Set(data.map((item: StudentResult) => item.Model_Test.toString())))
        setAvailableModelTests(modelTests)
      } catch (error) {
        console.error("Error fetching results:", error)
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
                    No test results have been loaded from the backend. Please check your API connection.
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
