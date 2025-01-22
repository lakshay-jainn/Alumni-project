import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  name: string
  jobtitle: string
  company: string
  course: string
  batch: string
  
}
const filterFunction=(row, columnId, filterValue) => {
  if (filterValue.length ===0) return true;
  return filterValue.some((value) =>row.getValue(columnId).toLowerCase().includes(value.toLowerCase()))
}
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    filterFn: filterFunction
  },
  {
    accessorKey: "jobtitle",
    header: "Job Title",
    filterFn: filterFunction
  },
  {
    accessorKey: "company",
    header: "Company",
    filterFn: filterFunction
  },
  {
    accessorKey: "course",
    header: "Course",
    filterFn: filterFunction
  },
  {
    accessorKey: "batch",
    header: "Batch",
    filterFn: filterFunction  
  },
  {
    accessorKey: "connect",
    header: "",
    cell: ({ row } : any) => (
      <button
      onClick={()=>handleConnect(row.original)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Connect
      </button>)
  },
]

const handleConnect = (row: Payment) => {
  alert(`Connect button clicked for ${row.name}`);
};