
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckIcon, MoreHorizontalIcon, XIcon } from "lucide-react"
import  useFetchPendingRequests  from "@/api/hooks/useFetchPendingRequests"
import { Approve } from "@/api/services/adminService"
import { AlumniRequest } from "@/api/types/adminTypes"
import { Action } from "sonner"

export function AlumniRequestsTable() {
  const [refetchTable,setRefetchTable] = useState(false)
  const {pendingRequests} = useFetchPendingRequests(refetchTable)!
  const [selectedRequest, setSelectedRequest] = useState<null | AlumniRequest>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [actionType, setActionType] = useState("")

  console.log("36",pendingRequests)

  const handleAction = (action:string, request:AlumniRequest) => {
    if (action === "view") {
      setSelectedRequest(request)
      setViewDialogOpen(true)
    } else {
      setSelectedRequest(request)
      setActionType(action)
      setConfirmDialogOpen(true)
    }
  }

  const confirmAction = async() => {
    try {
      await Approve({
          action: actionType,
          userId : selectedRequest?.userId,
      })
      
      } catch (error) {
      console.error("Error:", error)
    }
    setRefetchTable(!refetchTable)
    setSelectedRequest(null)
    setConfirmDialogOpen(false)
  }

  return (
    <>
      <Table>
        <TableHeader className="bg-white">
          <TableRow>
            <TableHead className="">Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Enrollment No.</TableHead>
            <TableHead>Graduation Year</TableHead>
            <TableHead className="">Alumni/Student</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingRequests && pendingRequests.map((request) => (
            <TableRow key={request.userId}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={request.user.profileImage} alt={request.basic.firstName} />
                    <AvatarFallback>{request.basic.firstName && request.basic.firstName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                </div>
              </TableCell>
              <TableCell>{request.basic.firstName + "" + (request.basic.lastName || "") }</TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>{request.enrollmentNumber}</TableCell>
              <TableCell>{request.batch}</TableCell>
              <TableCell>
                {request.user.role}
              </TableCell>
              <TableCell>
                <Badge
                    variant={
                      request.status === "ACCEPTED"
                        ? "default"
                        : request.status === "REJECTED"
                        ? "destructive"
                        : "outline"
                    }
                >

                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {request.status === "PENDING" ? (
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 text-green-500"
                      onClick={() => handleAction("ACCEPTED", request)}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 text-red-500"
                      onClick={() => handleAction("REJECTED", request)}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleAction("view", request)}>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => handleAction("view", request)}>
                    View Details
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedRequest && (
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Alumni Request Details</DialogTitle>
              <DialogDescription>Complete information about the alumni request</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center gap-2 mb-4">
                <Avatar className="h-20 w-20">
                
                  <AvatarImage src={`/placeholder.svg?height=80&width=80`} alt={selectedRequest.basic.firstName} />
                  <AvatarFallback>{selectedRequest.basic.firstName && selectedRequest.basic.firstName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{selectedRequest.basic.firstName+" "+(selectedRequest.basic.lastName || "")}</h3>
                <Badge
                  variant={
                    selectedRequest.status === "ACCEPTED"
                      ? "default"
                    : selectedRequest.status === "REJECTED"
                      ? "destructive"
                    : "outline"
                    }
                >

                  {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-medium">Email:</div>
                <div className="col-span-2">{selectedRequest.email}</div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-medium">Enrollment No:</div>
                <div className="col-span-2">{selectedRequest.enrollmentNumber}</div>
              </div>

              {/* <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-medium">Date of Birth:</div>
                <div className="col-span-2">{selectedRequest.basic.}</div>
              </div> */}

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-medium">Graduation Year:</div>
                <div className="col-span-2">{selectedRequest.batch}</div>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              {selectedRequest.status === "PENDING" && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setViewDialogOpen(false)
                      handleAction("REJECTED", selectedRequest)
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      setViewDialogOpen(false)
                      handleAction("ACCEPTED", selectedRequest)
                    }}
                  >
                    Approve
                  </Button>
                </>
              )}
              {selectedRequest.status !== "PENDING" && <Button onClick={() => setViewDialogOpen(false)}>Close</Button>}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {selectedRequest && (
        <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{actionType === "ACCEPTED" ? "Approve Request" : "Reject Request"}</DialogTitle>
              <DialogDescription>
                {actionType === "ACCEPTED"
                  ? "Are you sure you want to approve this alumni request?"
                  : "Are you sure you want to reject this alumni request?"}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant={actionType === "ACCEPTED" ? "default" : "destructive"} onClick={confirmAction}>
                {actionType === "ACCEPTED" ? "Approve" : "Reject"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

