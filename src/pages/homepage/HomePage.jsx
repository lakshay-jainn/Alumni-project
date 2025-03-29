import NavBar from "./components/Navbar";
import CarouselPage from "./components/Crousel";
import Footer from "./components/Footer";
import React from "react";


function HomePage() {
    return (
        <div>
            <NavBar />
            <div className="relative w-full h-[500px] md:h-[600px]">
                <img src="https://www.hansrajcollege.ac.in/uploads/infrastructure/campus/13.jpeg" alt="College Campus" className="absolute inset-0 w-full h-full object-cover blur-[4px]" />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold">Welcome to Hansraj College's</h1>
                    <h3 className="text-4xl md:text-5xl font-extrabold p-4">Alumni-Connect</h3>
                    <p className="text-lg md:text-2xl mt-4 max-w-2xl">
                        The legacy continues....
                    </p>
                </div>
            </div>
            <div className="mt-10 ">
            <div className="m-2 flex flex-col items-center text-center border border-slate-300 rounded-lg  hover:text-black  py-2 px-3 hover:bg-gray-200 hover:shadow-xl hover:border-[2px] transition-colors">
                <span className="text-5xl md:text-8xl font-extrabold text-gray-800 t-10 ">Overview</span>
                <div className="m-5 text-base md:text-2xl max-w-6xl">
                    <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem aliquid dolorem delectus consequatur, culpa atque in. Voluptatum doloribus sequi laborum magnam explicabo magni voluptatem reprehenderit ratione enim fugit! Ut, blanditiis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, vel eveniet autem ad quia quae fuga, earum libero quis necessitatibus dolore dolorum. Quo natus eveniet vero! Dolore obcaecati beatae quasi.</p>
                </div>
            </div>
            </div>
            <CarouselPage />
            <Footer />
        </div >
    
    );
}
export default HomePage