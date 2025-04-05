import { ColumnDef } from "@tanstack/react-table"
import AlumniNavigate from "../AlumniNavigate"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  name: string
  jobtitle: string
  company: string
  course: string
  batch: string
  img:string
  
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "img",
    header: "",
    cell: ({ row } : any) => (
      <img src={row.original.img}
        className="w-12 aspect-square rounded-full inline-block"
      />
        
      )

  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "jobtitle",
    header: "Job Title",
    className: "hidden xs:table-cell",
  },
  {
    accessorKey: "company",
    header: "Company",
    className: "hidden xs:table-cell",

  },
  {
    accessorKey: "course",
    header: "Course",

  },
  {
    accessorKey: "batch",
    header: "Batch",

  },
  {
    accessorKey: "connect",
    header: "",
    className: "hidden md:table-cell",
    cell: ({ row } : any) => (
      <AlumniNavigate data={row.original} />
      )
  },
]

