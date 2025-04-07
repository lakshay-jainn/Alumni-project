
import { Link } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGlobalAuth from "@/Auth/useGlobalAuth";
import { useNavigate } from "react-router-dom";
import {toast} from 'sonner';
// Define the registration schema with Zod
const registerSchema = z.object({
  firstName:z.string(),
  lastName:z.string().optional(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isAlumni, setIsAlumni] = useState(true);
  const navigate = useNavigate();
  const { Login } = useGlobalAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName:data.firstName,
          lastName:data.lastName || "",
          username: data.username,
          email: data.email,
          password: data.password,
          isAlumni: isAlumni,
        }),
      });

      const responseData = await response.json();
      
      if (response.ok) {
        const token = responseData.token;
        Login(token);
        navigate("/dashboard");
        toast.success("You have been registered successfully");
      } else {
        throw new Error(responseData.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred during registration")
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-100">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Title section */}
        <div className="relative h-24 overflow-hidden">
          <div
            className={`absolute w-full px-6 py-8 text-center text-3xl font-semibold transition-all duration-500 ease-in-out ${isAlumni ? "translate-x-0" : "-translate-x-full"}`}
          >
            Alumni Signup
          </div>
          <div
            className={`absolute w-full px-6 py-8 text-center text-3xl font-semibold transition-all duration-500 ease-in-out ${isAlumni ? "translate-x-full" : "translate-x-0"}`}
          >
            Student Signup
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
            <div className="flex flex-wrap gap-5">
                <Input
                  {...register("firstName")}
                  placeholder="First Name"
                  className="h-[50px] flex-1 rounded-2xl border-gray-300 text-base"
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
                <Input
                  {...register("lastName")}
                  placeholder="Last Name"
                  className="h-[50px] flex-1 rounded-2xl border-gray-300 text-base"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
              </div>
              <Input
                {...register("username")}
                placeholder="Username"
                className="h-[50px] rounded-2xl border-gray-300 text-base mt-5"
              />
              {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>}
            </div>

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

            <div className="mt-5">
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm password"
                className="h-[50px] rounded-2xl border-gray-300 text-base"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <div className="relative mt-8 h-[50px] overflow-hidden rounded-2xl">
              <div className="absolute left-0 h-full w-full bg-[#95323d] transition-all duration-300 hover:bg-[#7e2a33]"></div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="relative z-10 h-full w-full rounded-2xl border-none bg-transparent text-xl font-medium text-white"
              >
                {isSubmitting ? "Signing up..." : "Signup"}
              </Button>
            </div>

            <div className="mt-6 text-center">
              Already registered?{" "}
              <Link to="/auth/login" className="text-blue-600 hover:underline">
                Login here!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
