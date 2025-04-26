import { ColumnDef } from "@tanstack/react-table"
import AlumniNavigate from "../AlumniNavigate"
import { AlumniSearchResponse } from "@/api/types/alumniSearchTypes"


export const columns: ColumnDef<AlumniSearchResponse>[] = [
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

