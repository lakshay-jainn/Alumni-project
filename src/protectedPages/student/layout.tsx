import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Navbar/Sidebar";
import {  useState, useEffect } from "react";
import useGlobalAuth from "@/Auth/useGlobalAuth";
import { useNavigate } from "react-router-dom";

function StudentPage() {
  const navigate = useNavigate();
  const {Logout} = useGlobalAuth();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  console.log(isMobileView);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleLogout = () => {
    
      Logout();
      navigate('/', { replace: true });
    
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <Navbar />
      </header>

      {/* Main content area */}
      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 h-[calc(100vh-4.5rem)] border-r border-gray-100 bg-white sticky top-[4.5rem]">
          <div className="h-full overflow-y-auto scrollbar-thin flex flex-col">
            <Sidebar />
            
            {/* Logout button at bottom for desktop */}
            <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-4 mt-auto">
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center w-full gap-2 rounded-lg px-4 py-3 bg-white border border-gray-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-all duration-200"
                aria-label="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Content area */}
        <main className="flex-1">
          <div className="h-[calc(100vh-4.5rem)] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-center">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentPage;