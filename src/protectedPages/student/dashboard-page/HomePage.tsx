import './HomePage.module.css'
import AlumniDashboard from './components/Connections';
import { Calendar, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

function HomePage() {
  const user = "Ben10"
  return (
    <>
      <div className='flex flex-wrap w-auto m-3 gap-6'>
      <div className="flex p-6 bg-white w-full border rounded-lg shadow-md ">
            <div className="mx-auto  mb-6 flex flex-col md:flex-row md:items-center md:justify-between w-full">
                <div>
                    <h1 className="text-2xl font-bold">Welcome back, {user}!</h1>
                    <p className="text-gray-500">Here's what's going on in your alumni network</p>
                </div>
                <div className="mt-4 flex justify-center gap-2 md:mt-0">
                    <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                        <Mail className="mr-2 h-4 w-4" />
                        Inbox
                    </Button>
                    <Button variant="outline" className="border-rose-200 text-rose-500 hover:bg-rose-50">
                        <Calendar className="mr-2 h-4 w-4" />
                        Events
                    </Button>
                </div>
            </div>
        </div>
        <AlumniDashboard />
        </div>

      

    </>
  )
}

export default HomePage;
