import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";


function AdminPage(){
    const navItemClass = ({ isActive }:{isActive: boolean }) =>
        `flex-1 min-w-max rounded-2xl p-2 
        ${isActive ? 'bg-gradient-to-r from-red-400 to-orange-400 text-white' : 'text-gray-700 hover:bg-gray-100'}`;
    
    return (
        <main>
            <header className="p-2">
                <nav className="border-4 p-2 rounded-2xl">
                    <ul className="flex gap-5 justify-center flex-wrap text-center">
                    <NavLink className={navItemClass} to="/admin" end>
                        <li className="">Home</li>
                    </NavLink>
                    <NavLink className={navItemClass} to="/admin/alumni-request">
                        <li className="">Alumni Request</li>
                    </NavLink>
                        
                    <NavLink className={navItemClass} to="/admin/add-alumni-student">
                        <li className="">Add Alumni/Student</li>
                    </NavLink>
                        
                    </ul>
                </nav>
            </header>
            <Outlet />
        </main>
    );

}
export default AdminPage;