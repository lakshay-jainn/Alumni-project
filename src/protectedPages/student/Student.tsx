import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"

function StudentPage(){
    return (
        <div className='flex flex-col items-center w-screen h-screen bg-slate-100'>
        <Navbar />
        <Outlet />
        </div>
    )
}

export default StudentPage;