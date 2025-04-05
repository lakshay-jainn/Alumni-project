import { User, Menu } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/Auth/AuthContext";
import { useContext, useState, useEffect } from "react";
import MobileSidebar from "./MobileSidebar";
import ReactDOM from "react-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Logout } = useContext(AuthContext)!;
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  const handleLogout = () => {
    Logout();
    navigate('/auth/login');
  };

  return (
    <>
      {/* Removed container and padding for full width */}
      <div className={`w-full bg-white py-4 px-6 border-0 ${scrolled ? 'shadow-md' : 'shadow-sm'} flex items-center justify-between transition-all duration-300 backdrop-blur-sm bg-white/90`}>
        {/* Mobile Menu Button - Left */}
        <button 
          onClick={() => setShowMobileMenu(true)}
          className="md:hidden flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        {/* Logo - Centered on mobile, left on desktop */}
        <Link to="/dashboard" className="no-underline mx-auto md:ml-0 md:mr-auto">
          <div className="flex items-center gap-2">
            <div className="logo-container relative h-8 w-8 rounded-lg shadow-md overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#95323d] to-[#c04757] animate-gradient"></div>
              <div className="absolute inset-0 opacity-10 pattern-overlay"></div>
              <span className="relative text-white font-bold text-lg flex items-center justify-center">
                <span className="drop-shadow-sm">A</span>
                <span className="absolute h-0.5 w-4 bg-white/80 -bottom-0.5 rounded-full"></span>
              </span>
              <div className="absolute top-0 right-0 h-2 w-2 bg-white/20 rounded-bl-lg"></div>
            </div>
            <div className="font-semibold text-sm sm:text-base text-gray-900">
              Alumni <span className="text-[#95323d]">Connect</span>
            </div>
          </div>
        </Link>
        
        {/* Profile Button - Right */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <div className="text-xs text-gray-500">Welcome back</div>
            <div className="text-sm font-medium text-gray-800">Alumni User</div>
          </div>
          <Link to='/profile'>
            <button 
              className="flex justify-center items-center rounded-full aspect-square p-2 bg-[#95323d] text-white transition-all duration-200 hover:bg-[#7c2a32] shadow-sm hover:shadow"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar - Rendered with Portal to ensure full viewport coverage */}
      {ReactDOM.createPortal(
        <MobileSidebar 
          isOpen={showMobileMenu} 
          onClose={() => setShowMobileMenu(false)}
          onLogout={handleLogout}
        />,
        document.body
      )}
    </>
  );
};

export default Navbar;