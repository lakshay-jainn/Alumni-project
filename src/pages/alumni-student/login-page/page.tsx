import { Link } from "react-router-dom"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useGlobalAuth from "@/Auth/useGlobalAuth"
import {toast} from 'sonner'
import { useNavigate } from "react-router-dom"
// Define the login schema with Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isAlumni, setIsAlumni] = useState(true)
  const { Login } = useGlobalAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          isAlumni: isAlumni,
        }),
      })

      const responseData = await response.json()

      if (response.ok) {
        const token = responseData.token
        Login(token)
        navigate("/dashboard")
        toast.success("Login successful!")
      } else {
        throw new Error(responseData.message || "Login failed")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred during login")
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-100">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Title section */}
        <div className="relative h-24 overflow-hidden">
          <div
            className={`absolute w-full px-6 py-8 text-center text-3xl font-semibold transition-all duration-500 ease-in-out ${isAlumni ? "translate-x-0" : "-translate-x-full"}`}
          >
            Alumni Login
          </div>
          <div
            className={`absolute w-full px-6 py-8 text-center text-3xl font-semibold transition-all duration-500 ease-in-out ${isAlumni ? "translate-x-full" : "translate-x-0"}`}
          >
            Student Login
          </div>
        </div>

        {/* Toggle controls */}
        <div className="relative mx-6 mb-4 mt-2 overflow-hidden rounded-2xl border border-gray-200">
          <div className="relative z-10 flex h-[50px] w-full">
            <button
              onClick={() => setIsAlumni(true)}
              className={`z-10 flex-1 text-lg font-medium transition-colors duration-500 ${isAlumni ? "text-white" : "text-black"}`}
            >
              Alumni
            </button>
            <button
              onClick={() => setIsAlumni(false)}
              className={`z-10 flex-1 text-lg font-medium transition-colors duration-500 ${!isAlumni ? "text-white" : "text-black"}`}
            >
              Student
            </button>
          </div>
          <div
            className="absolute top-0 z-0 h-full w-1/2 rounded-2xl bg-[#95323d] transition-all duration-500 ease-in-out"
            style={{
              left: isAlumni ? "0%" : "50%",
            }}
          ></div>
        </div>

        {/* Form section */}
        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5">
              <Input
                {...register("email")}
                placeholder="Email Address"
                className="h-[50px] rounded-2xl border-gray-300 text-base"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="mt-5">
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="h-[50px] rounded-2xl border-gray-300 text-base"
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="mt-2 text-right">
              <Link to="#" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <div className="relative mt-6 h-[50px] overflow-hidden rounded-2xl">
              <div className="absolute left-0 h-full w-full bg-[#95323d] transition-all duration-300 hover:bg-[#7e2a33]"></div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="relative z-10 h-full w-full rounded-2xl border-none bg-transparent text-xl font-medium text-white"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </div>

            <div className="mt-6 text-center">
              Not a member?{" "}
              <Link to="/auth/register" className="text-blue-600 hover:underline">
                Signup now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

