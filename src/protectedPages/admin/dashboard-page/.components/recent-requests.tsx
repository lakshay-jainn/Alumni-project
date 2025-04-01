
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import useFetchAcceptedRequests from "@/api/hooks/useFetchAcceptedRequests"
import { AlumniRequest } from "@/api/types/adminTypes"
export function RecentRequests() {
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<AlumniRequest | null>(null)
  const {acceptedRequests, loading, error} = useFetchAcceptedRequests()!
  const handleAction = (action:string, request:AlumniRequest) => {
    if (action === "view") {
      setSelectedRequest(request)
      setViewDialogOpen(true)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  return (
    <div className="space-y-4">
      {acceptedRequests && acceptedRequests.map((request) => (
        <div key={request.userId} className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={request.user.profileImage} alt={request.name} />
              <AvatarFallback>{request.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{request.name}</p>
              <p className="text-sm text-muted-foreground">{request.user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{request.enrolmentNumber}</Badge>
                <Badge variant="secondary">Alumni</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => handleAction("view", request)}>
              View
            </Button>
          </div>
        </div>
      ))}
      {acceptedRequests && selectedRequest && (
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Alumni Request Details</DialogTitle>
              <DialogDescription>Complete information about the alumni request</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center gap-2 mb-4">
                <Avatar className="h-20 w-20">
                
                  <AvatarImage src={selectedRequest.user.profileImage} alt={selectedRequest.name} />
                  <AvatarFallback>{selectedRequest.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{selectedRequest.name}</h3>
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
                <div className="col-span-2">{selectedRequest.user.email}</div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-medium">Enrollment No:</div>
                <div className="col-span-2">{selectedRequest.enrolmentNumber}</div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-medium">Date of Birth:</div>
                <div className="col-span-2">{selectedRequest.DOB}</div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-medium">Graduation Year:</div>
                <div className="col-span-2">{selectedRequest.batch}</div>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              {selectedRequest.status === "pending" && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setViewDialogOpen(false)
                      handleAction("reject", selectedRequest)
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      setViewDialogOpen(false)
                      handleAction("approve", selectedRequest)
                    }}
                  >
                    Approve
                  </Button>
                </>
              )}
              {selectedRequest.status !== "pending" && <Button onClick={() => setViewDialogOpen(false)}>Close</Button>}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <div className="text-center mt-2">
        <Link to="/admin/alumni-requests">
          <Button variant="link">View All Requests</Button>
        </Link>
      </div>
    </div>
  )
}

