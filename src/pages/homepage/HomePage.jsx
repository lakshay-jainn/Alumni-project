import NavBar from "./components/Navbar";
import AutoCarousel from "./components/AutoCarousel";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

// const AutoCarousel = () => {
//     const allSlides = 5;
//     const [currentIndex, setCurrentIndex] = useState(0);
//     useEffect (() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) => (prevIndex+1)%allSlides);
//         },4000);
    
//     return () => clearInterval(interval);  },
// ),[]};

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
            <AutoCarousel/>
            {/* <Carousel className="w-full max-w-xs m-5">
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel> */}
        </div >
    );
}
export default HomePage