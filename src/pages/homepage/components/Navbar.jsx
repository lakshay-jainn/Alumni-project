import React from 'react';
import { BadgeInfo, Contact, LogIn } from 'lucide-react';

const NavBar = () => {
    return (
        <div className=" bg-gray-50 h-[68px] ">
            <nav className="bg-white fixed top-0 left-0 right-0 z-50 shadow-slate-900 ">
                <div className="max-w-7xl mx-auto px-1 py-1 pb-2 flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="https://www.hansrajcollege.ac.in/assets/front/images/logo_new.png" alt="University Logo" className="h-14 w-30 " />
                    </div>
                    <div className="flex gap-5">
                        <a href="#" className="flex items-center text-gray-800 hover:text-black hover:font-bold">
                            <BadgeInfo className="mr-2 h-5 w-5" />
                            About
                        </a>
                        <a href="#" className="flex items-center text-gray-800 hover:text-black hover:font-bold">
                            <Contact className="mr-2 h-5 w-5" />
                            Contact Us
                        </a>
                        <a href="#" className="flex items-center text-gray-800 hover:text-black hover:font-bold">
                            <LogIn className="mr-2 h-5 w-5" />
                            Login
                        </a>
                    </div>
                </div>
            </nav>
        </div>

    );
};

export default NavBar;
