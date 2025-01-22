import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"

function StudentPage(){
    return (
        <div className='flex flex-col items-center pl-0 max-w-screen min-h-screen bg-slate-100 pb-28 student'>
        <Navbar />
        <Outlet />
        </div>
    )
}

export default StudentPage;