import React, { useState, useEffect } from 'react';
import { BadgeInfo, Contact, LogIn, Menu, X } from 'lucide-react';
import './Navbar.module.css';
import { Link } from 'react-router-dom';
const NavLink = ({ icon, text,to='' } : {icon:any,text:string, to?:string}) => (
    <Link className='flex items-center text-gray-700 hover:text-indigo-600 font-medium py-2 px-3 rounded-lg hover:bg-indigo-50 transition-all duration-300 group' to={to}>
        
            <div className="relative overflow-hidden mr-2">
                {icon && React.cloneElement(icon, { className: "h-5 w-5 transition-all duration-300 group-hover:scale-110" })}
            </div>
            <span className="relative">
                {text}
                <span className="absolute h-0.5 w-0 bg-indigo-600 bottom-0 left-0 transition-all duration-300 group-hover:w-full"></span>
            </span>
      
    </Link>
);

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-red-300 h-[15px]">
            <nav className={`bg-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrollPosition > 50 ? 'shadow-lg border-b border-indigo-100' : 'shadow-md border-b border-indigo-100'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 pb-2 flex justify-between items-center">
                    <div className="flex items-center">
                        <img 
                            src="https://www.hansrajcollege.ac.in/assets/front/images/logo_new.png" 
                            alt="University Logo" 
                            className="h-14 w-auto transition-all duration-300 hover:opacity-90" 
                        />
                    </div>

                    <div className="hidden md:flex gap-4">
                        {/* <NavLink icon={<BadgeInfo />} text="About" />
                        <NavLink icon={<Contact />} text="Contact Us" /> */}
                        <NavLink icon={<LogIn />} to="/auth/login" text="Login" />
                    </div>

                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="text-indigo-600 hover:text-indigo-800 focus:outline-none p-2 rounded-full hover:bg-indigo-50 transition-all duration-300"
                        >
                            {isMenuOpen ? <X size={24} className="transition-transform duration-300 rotate-90" /> : <Menu size={24} className="transition-transform duration-300" />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 border-t border-indigo-100 shadow-md animate-slideDown">
                        {/* <NavLink icon={<BadgeInfo />} text="About" />
                        <NavLink icon={<Contact />} text="Contact Us" /> */}
                        <NavLink icon={<LogIn />} to="/auth/login" text="Login" />
                    </div>
                )}
            </nav>
        </div>
    );
};

export default NavBar;