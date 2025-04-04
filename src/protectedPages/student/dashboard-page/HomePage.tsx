import './HomePage.module.css';
import { ConnectionPage } from './components/Connections';
import { Activities } from './components/Activities';
import { Calendar, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const goToEvents = () => navigate('/events');
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
              <button className="flex items-center bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
                <Mail className="mr-2 h-4 w-4" />
                Inbox
              </button>
              <button onClick={goToEvents} className="flex items-center border-2 border-rose-500 text-rose-500 hover:bg-rose-100 font-semibold py-2 px-4 rounded-lg shadow-md">
                <Calendar className="mr-2 h-4 w-4" />
                Events
              </button>
            </div>
          </div>
        </div>
        <ConnectionPage />
        <Activities />
      </div>



    </>
  )
}

export default HomePage;
