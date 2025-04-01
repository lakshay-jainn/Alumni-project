import { AlumniRequestsTable } from "./.components/alumni-requests-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

export default function Admin_AlumniRequestsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alumni Requests</h1>
          <p className="text-muted-foreground">Manage and verify alumni registration requests</p>
        </div>
        <Link to="/admin/add-member">
          <Button>Add New Member</Button>
        </Link>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Pending Verification</CardTitle>
          <CardDescription>Review and approve or reject alumni registration requests</CardDescription>
        </CardHeader>
        <CardContent>
          <AlumniRequestsTable />
        </CardContent>
      </Card>
    </div>
  )
}

