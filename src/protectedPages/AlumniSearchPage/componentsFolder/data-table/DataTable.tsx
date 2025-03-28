import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Payment } from "./columns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Fragment } from "react/jsx-runtime"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
import { cn } from "@/lib/utils";

const handleConnect = (row: Payment) => {
  alert(`Connect button clicked for ${row.name}`);
};



export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
 
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}  className={cn(header.column.columnDef.className, "p-2 text-center")}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
              <TableRow
                
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cn(cell.column.columnDef.className, "p-2 text-center")}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    
                  </TableCell>
                  
                ))}
                
              </TableRow>
              <tr className="border-b transition-colors md:hidden">
              <td colSpan={row.getVisibleCells().length} className="px-4 py-2">
                      <button onClick={()=>handleConnect(row.original)} className="bg-[#95323d] text-white w-full rounded py-[6px] hover:bg-red-600">
                            Connect
                      </button>
                  </td>
              </tr>
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
          
        </TableBody>
      </Table>
    </div>
  )
}