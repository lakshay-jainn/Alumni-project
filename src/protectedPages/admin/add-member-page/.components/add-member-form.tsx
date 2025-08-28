import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from 'sonner'
import { handleApiError } from "@/api/utils/apiUtils"
import { SignupAPI } from "@/api/services/authService"
import { createBulkUser } from "@/api/services/adminService"
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  rollNumber: z.string().min(5, {
    message: "Roll number must be at least 5 characters.",
  }),
  dateOfBirth: z.string().min(1, {
    message: "Date of birth is required.",
  }),
  role: z.enum(["alumni", "student"], {
    message: "Please select a role.",
  }),
  graduationYear: z.string().optional(),
  department: z.string().optional(), 

  csvFile: z.instanceof(File).optional()
})

export function AddMemberForm() {
  const [role, setRole] = useState("alumni")
  const [activeTab, setActiveTab] = useState("individual")
  const [csvFile,setCsvFile] = useState()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      rollNumber: "",
      dateOfBirth: "",
      role: "alumni",
      graduationYear: "",
      department: "",
      csvFile: new File([], "empty.csv", { type: "text/csv" }),
    },
  })
  const loadDaFile = (event : any) =>{
    setCsvFile(event.target.files[0])
  }
  const onSubmit = async (newMember:any) => {
    
    if (activeTab == "individual"){
    try{
      await SignupAPI({username:newMember.rollNumber, email:newMember.email, password:newMember.rollNumber, isAlumni:newMember.role === "alumni"});
      toast.success("User added successfully")
    }
    catch(e){
      const error = handleApiError(e);
      console.log(error.message)
      toast.error(error.message);
    }
  } 
    form.reset()
  }
  const onBulkUpload = async(event : any) => {
    event.preventDefault();
    console.log("nigga bro i will kill you");
    try{
      const formData = new FormData();
      formData.append("csvFile",csvFile!)
      const data = await createBulkUser(formData);
      toast.success(data.message)
    }
    catch(error){
      const errorMsg = handleApiError(error);
      toast.error(errorMsg.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="individual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="individual" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email address" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter roll number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        setRole(value)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="alumni">Alumni</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {role === "alumni" && (
                <FormField
                  control={form.control}
                  name="graduationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Graduation Year</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter graduation year" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="computer_science">Computer Science</SelectItem>
                        <SelectItem value="electrical">Electrical Engineering</SelectItem>
                        <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                        <SelectItem value="civil">Civil Engineering</SelectItem>
                        <SelectItem value="business">Business Administration</SelectItem>
                        <SelectItem value="arts">Arts & Humanities</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Add Member</Button>
            </div>
          </TabsContent>

          <TabsContent value="bulk">

 
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Bulk Upload</CardTitle>
                  <CardDescription>Upload a CSV file with member details</CardDescription>
                </CardHeader>
                <CardContent>
                  
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="csv-upload">Upload CSV</Label>
                    <Input id="csv-upload" name = "csvFile" type="file" accept=".csv" onChange={loadDaFile} />
                    <p className="text-sm text-muted-foreground">
                      CSV should have columns: name, email, roll_number, date_of_birth, role
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Download Template</Button>
                  <Button  onClick={onBulkUpload}>Upload</Button>
                </CardFooter>
              </Card>

          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}

