"use client"

import Image from "next/image"
import { Search } from "lucide-react"

interface HeaderProps {
  selectedModelTest: string
  setSelectedModelTest: (value: string) => void
  searchQuery: string
  setSearchQuery: (value: string) => void
  availableModelTests: string[]
}

export default function Header({
  selectedModelTest,
  setSelectedModelTest,
  searchQuery,
  setSearchQuery,
  availableModelTests,
}: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Image src="/logo.png" alt="Physics Hunters Logo" width={60} height={60} className="mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Physics Hunters</h1>
              <p className="text-gray-600">RU GST Suggestion Batch 2025</p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700">Model Test Result Viewer</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <label htmlFor="modelTest" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Model Test
            </label>
            <select
              id="modelTest"
              value={selectedModelTest}
              onChange={(e) => setSelectedModelTest(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            >
              <option value="all">All Model Tests</option>
              {availableModelTests.map((test) => (
                <option key={test} value={test}>
                  Model Test {test}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-2/3">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search by Name, Roll, or College
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                placeholder="Search by name, roll, or college..."
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
