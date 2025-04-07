import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AlumniListLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center">
          <Skeleton className="w-10 h-10 rounded-full mr-4" />
          <div className="md:hidden">
            <Skeleton className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Batch" />
            </SelectTrigger>
          </Select>
        </div>
        <div>
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Course" />
            </SelectTrigger>
          </Select>
        </div>
        <div>
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Job Title" />
            </SelectTrigger>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Job Title</th>
              <th className="py-3 px-4 text-left">Company</th>
              <th className="py-3 px-4 text-left">Course</th>
              <th className="py-3 px-4 text-left">Batch</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index} className="border-t">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <Skeleton className="w-12 h-12 rounded-full mr-3" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Skeleton className="h-5 w-28" />
                </td>
                <td className="py-4 px-4">
                  <Skeleton className="h-5 w-24" />
                </td>
                <td className="py-4 px-4">
                  <Skeleton className="h-5 w-20" />
                </td>
                <td className="py-4 px-4">
                  <Skeleton className="h-5 w-16" />
                </td>
                <td className="py-4 px-4">
                  <Skeleton className="h-10 w-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
