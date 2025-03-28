import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"

function StudentPage(){
    return (
        <div className='flex flex-col items-center pl-0 max-w-screen bg-slate-100 md:h-screen min-h-screen student'>
        <Navbar />
        <Outlet />
        </div>
    )
}

export default StudentPage;