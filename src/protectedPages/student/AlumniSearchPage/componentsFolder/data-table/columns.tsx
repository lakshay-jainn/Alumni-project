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
  img:string
  
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "img",
    header: "",
    cell: ({ row } : any) => (
      <img src='/img_avatar.png'
        className="w-[60px] aspect-square rounded-full inline-block"
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
    cell: ({ row } : any) => (
      <button
      onClick={()=>handleConnect(row.original)}
        className="px-4 py-2 hidden md:block bg-[#95323d]  w-full text-white rounded hover:bg-red-600  flex-wrap"
      >
        Connect
      </button>)
  },
]

const handleConnect = (row: Payment) => {
  alert(`Connect button clicked for ${row.name}`);
};