
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SigninAPI } from "@/api/services/authService"
import {toast} from 'sonner'
import useGlobalAuth from "@/Auth/useGlobalAuth"
import { handleApiError } from "@/api/utils/apiUtils"
// Define the form schema with Zod
const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .refine((email) => email.endsWith("@college.edu"), {
      message: "Must be a college email address",
    }),
  password: z.string().min(1, "Password is required"),
})

// Infer the type from the schema
type LoginFormValues = z.infer<typeof loginFormSchema>

export function LoginForm() {
  const { Login } = useGlobalAuth()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Initialize form with react-hook-form and zod resolver
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = async (values: LoginFormValues) => {
    setError("")
    setIsLoading(true)
    console.log(values)
    try {
      // Call the server action to handle login
      const response = await SigninAPI({email:values.email,password:values.password})
      Login(response.token) // Replace with actual login logic
      toast.success("Login successful!")
      
    } catch (err) {
      const error=handleApiError(err)
      console.error(error.message);
      // setError("An error occurred during login")
      
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-white border">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@college.edu" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="p-0 h-auto text-sm" type="button">
                  Forgot password?
                </Button>
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input id="password" type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-center text-sm text-gray-500 mt-4">
              <p>For demo: use any @college.edu email with password "admin123"</p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

