import type { StudentResult } from "@/types/types"
import { maskMobileNumber } from "@/utils/formatters"

interface ResultsTableProps {
  results: StudentResult[]
}

export default function ResultsTable({ results }: ResultsTableProps) {
  // Sort results by Position (ascending)
  const sortedResults = [...results].sort((a, b) => Number(a.Position) - Number(b.Position))

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Position
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Roll
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Mobile
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                College
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Model Test
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Physics
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Chemistry
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ICT
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {results.some((r) => r.MATH_true !== undefined && r.MATH_true > 0) ? "Math" : "Math/Bio"}
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {results.some((r) => r.BIO_true !== undefined && r.BIO_true > 0) ? "Biology" : ""}
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                PHY+CHEM+ICT
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Best Optional
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Time
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Wrong
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedResults.map((result, index) => (
              <tr
                key={`${result.Roll || index}-${result.Model_Test || index}`}
                className={Number(result.Position) <= 3 ? "bg-yellow-50" : ""}
              >
                <td className="px-3 py-4 whitespace-nowrap">
                  <div
                    className={`text-sm font-medium ${Number(result.Position) <= 3 ? "text-amber-800 font-bold" : "text-gray-900"}`}
                  >
                    {result.Position || "-"}
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{result.Roll || "-"}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{result.Mobile ? maskMobileNumber(result.Mobile) : "-"}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{result.Name || "-"}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{result.College || "-"}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{result.Model_Test || "-"}</div>
                </td>

                {/* Physics */}
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-xs text-center">
                    <span className="text-green-600">{result.PHY_true || 0}T</span> /{" "}
                    <span className="text-red-600">{result.PHY_false || 0}F</span>
                    <div className="font-medium text-gray-900">{result.PHY_marks || 0}</div>
                  </div>
                </td>

                {/* Chemistry */}
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-xs text-center">
                    <span className="text-green-600">{result.CHEM_true || 0}T</span> /{" "}
                    <span className="text-red-600">{result.CHEM_false || 0}F</span>
                    <div className="font-medium text-gray-900">{result.CHEM_marks || 0}</div>
                  </div>
                </td>

                {/* ICT */}
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-xs text-center">
                    <span className="text-green-600">{result.ICT_true || 0}T</span> /{" "}
                    <span className="text-red-600">{result.ICT_false || 0}F</span>
                    <div className="font-medium text-gray-900">{result.ICT_marks || 0}</div>
                  </div>
                </td>

                {/* Math/Bio */}
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-xs text-center">
                    <span className="text-green-600">{result.MATH_true || result.MATH_BIO_true || 0}T</span> /{" "}
                    <span className="text-red-600">{result.MATH_false || result.MATH_BIO_false || 0}F</span>
                    <div className="font-medium text-gray-900">{result.MATH_marks || result.MATH_BIO_marks || 0}</div>
                  </div>
                </td>

                {/* Biology (if exists) */}
                <td className="px-3 py-4 whitespace-nowrap">
                  {result.BIO_true !== undefined && result.BIO_true > 0 ? (
                    <div className="text-xs text-center">
                      <span className="text-green-600">{result.BIO_true || 0}T</span> /{" "}
                      <span className="text-red-600">{result.BIO_false || 0}F</span>
                      <div className="font-medium text-gray-900">{result.BIO_marks || 0}</div>
                    </div>
                  ) : (
                    <div className="text-center">-</div>
                  )}
                </td>

                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{result.PHY_CHEM_ICT || 0}</div>
                </td>

                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{result.Best_Optional || "-"}</div>
                </td>

                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">{result.Total || 0}</div>
                </td>

                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{result.Time || "-"}</div>
                </td>

                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-red-600 font-medium">{result.Total_Wrong || 0}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
