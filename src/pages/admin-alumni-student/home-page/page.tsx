import NavBar from "./.components/NavBar";
import CarouselPage from "./.components/Crousel";
import Footer from "./.components/Footer";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="flex flex-col max-w-screen min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
            <NavBar />
            <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
                <img
                    src="https://www.hansrajcollege.ac.in/uploads/infrastructure/campus/13.jpeg"
                    alt="College Campus"
                    className="absolute inset-0 w-full h-full object-cover blur-[2px] transform scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black opacity-[0.5]"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white to-gray-300">Welcome to Hansraj College's</h1>
                    <h3 className="text-4xl md:text-5xl font-extrabold p-4 mb-2 text-transparent bg-clip-text bg-linear-to-r from-gray-300 to-white">Alumni-Connect</h3>
                    <p className="text-lg md:text-2xl mt-4 max-w-2xl font-light tracking-wide">
                        The legacy continues<span className="text-gray-300">...</span>
                    </p>
                    <div className="mt-8">
                        <Link to="/auth/register">
                            <button className="px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-black font-semibold transition-all duration-300 backdrop-blur-xs border border-white border-opacity-20">
                                Join the Network
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="mb-12 flex flex-col items-center text-center border-none rounded-xl py-8 px-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <span className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-gray-600 to-gray-700 mb-8">Overview</span>
                    <div className="text-base md:text-xl max-w-5xl">
                        <p className="text-gray-700 leading-relaxed">Welcome to Hansraj College, University of Delhi!  
Established in 1948 by the D.A.V. College Managing Committee in memory of Mahatma Hansraj, the college is among the top 10 institutions in India for Science, Commerce, and Arts. Known for academic excellence, sports, and extracurricular achievements, Hansraj nurtures holistic development while upholding traditional Indian values.  

                            The college boasts a modern infrastructure, including a well-stocked library, six computer labs, 18 science labs, a vast playground, an indoor sports complex, and Delhi University's only electronic shooting range. Facilities include an air-conditioned auditorium, seminar room, and a boys' hostel with solar geysers and 24-hour power backup.

                            Hansraj also offers scholarships, banking facilities, and a placement cell that connects students with top organizations. Join us to explore endless possibilities and shape a brighter future!.</p>
                    </div>
                </div>

                <CarouselPage />
            </div>

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;