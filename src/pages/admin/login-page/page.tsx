import { LoginForm } from "./components/login-form"


export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-linear-to-r from-blue-100 to-blue-50">
          <div className="flex h-full flex-col items-center justify-center p-8">
            <div className="max-w-md text-center">
              <h3 className="text-2xl font-bold text-gray-900">Alumni Connect Platform</h3>
              <p className="mt-2 text-gray-600">
                Manage alumni requests, add new members, and keep track of your college community all in one place.
              </p>
            </div>
            <img
              src="https://www.hansrajcollege.ac.in/uploads/infrastructure/campus/13.jpeg"
              alt="Alumni Connect"
              className="mt-8 rounded-lg shadow-lg w-[1000px] h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center">
            <img
              src="https://www.hansrajcollege.ac.in/assets/front/images/logo_new.png"
              alt="College Logo"
              width={150}
              height={50}
              className=""
            />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Admin Login</h2>
            <p className="mt-2 text-sm text-gray-600">Sign in to access the alumni-connect admin panel</p>
          </div>

          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
