import { AddMemberForm } from "./.components/add-member-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Admin_AddMemberPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Member</h1>
        <p className="text-muted-foreground">Manually add a new alumni or student to the platform</p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Member Details</CardTitle>
          <CardDescription>Enter the details of the new alumni or student</CardDescription>
        </CardHeader>
        <CardContent>
          <AddMemberForm />
        </CardContent>
      </Card>
    </div>
  )
}

