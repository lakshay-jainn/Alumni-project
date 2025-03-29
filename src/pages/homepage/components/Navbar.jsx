import React, { useState } from 'react';
import { BadgeInfo, Contact, LogIn, Menu, X } from 'lucide-react';

const NavLink = ({ icon, text }) => (
    <a href="#" className="flex items-center text-gray-800 hover:text-black hover:font-medium py-2 px-3 rounded hover:bg-gray-100 transition-colors">
        {icon}{text}
    </a>
);

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="bg-gray-50 h-[68px]">
            <nav className="bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 pb-2 flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="https://www.hansrajcollege.ac.in/assets/front/images/logo_new.png" alt="University Logo" className="h-14 w-auto" />
                    </div>

                    <div className="hidden md:flex gap-5">
                        <NavLink icon={<BadgeInfo className="mr-2 h-5 w-5" />} text="About" />
                        <NavLink icon={<Contact className="mr-2 h-5 w-5" />} text="Contact Us" />
                        <NavLink icon={<LogIn className="mr-2 h-5 w-5" />} text="Login" />
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 hover:text-black focus:outline-none">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-3">
                        < NavLink icon={<BadgeInfo className="mr-2 h-5 w-5" />} text="About" />
                        < NavLink icon={<Contact className="mr-2 h-5 w-5" />} text="Contact Us" />
                        < NavLink icon={<LogIn className="mr-2 h-5 w-5" />} text="Login" />
                    </div>
                )}
            </nav>
        </div>
    );
};


export default NavBar;

