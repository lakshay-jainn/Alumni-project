import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Alumni Connect admin panel</p>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/admin/alumni-requests">
          <Button variant="outline">View Requests</Button>
        </Link>
        <Link to="/admin/add-member">
          <Button>Add Member</Button>
        </Link>
      </div>
    </div>
  )
}

