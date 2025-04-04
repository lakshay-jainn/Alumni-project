
import  { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

type AlumniMember = {
  id: number;
  name: string;
  image: string;
  position: string;
  graduationYear: string;
  achievement: string;
};

type Event = {
  title: string;
  date: string;
  description: string;
};

const CarouselPage = () => {
  // Updated alumni data with timestamp to prevent caching issues
  const alumniData: AlumniMember[] = [
    {
      id: 1,
      name: "Shah Rukh Khan",
      image: "2.jpg",
      position: "Actor",
      graduationYear: "1988",
      achievement: "Bollywood superstar and global icon, graduated from Hansraj College."
    },
    {
      id: 2,
      name: "D.K. Joshi",
      image: "2.jpg",
      position: "Admiral",
      graduationYear: "1972",
      achievement: "Former Chief of Naval Staff of India."
    },
    {
      id: 3,
      name: "Kushal Tandon",
      image: "3.jpg",
      position: "Actor & Model",
      graduationYear: "2005",
      achievement: "Indian television actor known for various TV shows."
    }
  ];

  const events: Event[] = [
    { 
      title: "Alumni Meet 2025", 
      date: "April 5, 2025", 
      description: "Annual gathering of alumni to celebrate achievements and network with industry leaders." 
    },
    { 
      title: "Career Mentorship Workshop", 
      date: "April 12, 2025", 
      description: "Connect with alumni mentors for career guidance and professional development opportunities." 
    },
    { 
      title: "Fundraising Gala", 
      date: "April 19, 2025", 
      description: "Help support scholarships for the next generation of students through our annual charity event." 
    }
  ];

  // State management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(new Array(alumniData.length).fill(false));

  // Navigation functions
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % alumniData.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? alumniData.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Handle image load
  // Update your handleImageLoad function to handle errors better
// Handle image load
const handleImageLoad = (index: number) => {
  const newLoaded = [...imageLoaded];
  newLoaded[index] = true;
  setImageLoaded(newLoaded);
};


  return (
    <div className="w-full">
      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Events Section */}
        <div className="w-full rounded-lg border border-gray-300 overflow-hidden shadow-md">
          <div className="bg-gray-700 text-white p-3 flex items-center">
            <Calendar size={18} className="mr-2" />
            <h2 className="text-lg font-bold">Upcoming Events</h2>
          </div>
          <div className="p-3 max-h-60 overflow-y-auto bg-white">
            {events.map((event, index) => (
              <div key={index} className="p-3 mb-2 bg-white rounded border border-gray-200 hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-black">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{event.date}</p>
                <p className="text-sm mt-1 text-gray-700">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Section - Updated to be lengthier */}
        <div 
          className="w-full h-96 relative rounded-lg shadow-md overflow-hidden"
        >
          <div 
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {alumniData.map((alumni, index) => (
              <div key={alumni.id} className="min-w-full h-full flex flex-col items-center justify-center bg-gray-600 p-3">
                <div className="flex flex-col bg-gray-700 rounded-lg w-full h-full border border-gray-500 overflow-hidden">
                  {/* Image Section - Made taller */}
                  <div className="h-3/5 w-full relative flex items-center justify-center">
                    {!imageLoaded[index] && (
                      <div className="absolute h-full w-full bg-gray-500 animate-pulse flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                     src={alumni.image}
                     alt={alumni.name}
                     className={`absolute h-full w-full object-cover transition-opacity ${
                       imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                     }`}
                     style={{ objectPosition: 'center 25%' }} 
                     onLoad={() => handleImageLoad(index)}
                     onError={() => handleImageLoad(index)}
                   /> 
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-700 to-transparent"></div>
                  </div>
                  
                  {/* Text Section */}
                  <div className="h-2/5 p-4 overflow-y-auto">
                    <h3 className="text-lg font-bold text-white mb-1">{alumni.name}</h3>
                    <div className="flex items-center mb-2 gap-2">
                      <span className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-medium">
                        {alumni.position}
                      </span>
                      <span className="text-gray-200 text-sm">Class of {alumni.graduationYear}</span>
                    </div>
                    <p className="text-gray-200 text-sm">
                      {alumni.achievement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
            <button
              onClick={prevSlide}
              className="bg-gray-700/70 text-white p-2 rounded-full pointer-events-auto hover:bg-gray-800 transition-colors"
              disabled={isTransitioning}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-gray-700/70 text-white p-2 rounded-full pointer-events-auto hover:bg-gray-800 transition-colors"
              disabled={isTransitioning}
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
            {alumniData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 w-6 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex gap-6 h-[400px]">
        {/* Events Section */}
        <div className="w-1/3 rounded-lg border border-gray-300 overflow-hidden shadow-md">
          <div className="bg-gray-700 text-white p-3 flex items-center">
            <Calendar size={18} className="mr-2" />
            <h2 className="text-lg font-bold">Upcoming Events</h2>
          </div>
          <div className="p-3 overflow-y-auto h-[calc(100%-52px)] bg-white">
            {events.map((event, index) => (
              <div key={index} className="p-3 mb-2 bg-white rounded border border-gray-200 hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-black">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{event.date}</p>
                <p className="text-sm mt-1 text-gray-700">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Section */}
        <div 
          className="w-2/3 relative rounded-lg shadow-md overflow-hidden"
        >
          <div 
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {alumniData.map((alumni, index) => (
              <div key={alumni.id} className="min-w-full h-full flex items-center justify-center bg-gray-600 p-4">
                <div className="flex flex-row bg-gray-700 rounded-lg w-full h-[85%] border border-gray-500 overflow-hidden">
                  {/* Image Section */}
                  <div className="w-1/3 relative">
                    {!imageLoaded[index] && (
                      <div className="absolute h-full w-full bg-gray-500 animate-pulse flex items-center justify-center">
                        <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={alumni.image}
                      alt={alumni.name}
                      className={`absolute h-full w-full object-cover transition-opacity ${imageLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageLoad(index)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-transparent"></div>
                  </div>
                  
                  {/* Text Section */}
                  <div className="w-2/3 p-5 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-white mb-2">{alumni.name}</h3>
                    <div className="flex items-center mb-3">
                      <span className="bg-white text-gray-800 px-2 py-1 rounded text-sm font-medium">
                        {alumni.position}
                      </span>
                      <span className="ml-3 text-gray-200">Class of {alumni.graduationYear}</span>
                    </div>
                    <p className="text-gray-200">
                      {alumni.achievement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
            <button
              onClick={prevSlide}
              className="bg-gray-700/70 text-white p-2 rounded-full pointer-events-auto hover:bg-gray-800 transition-colors"
              disabled={isTransitioning}
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-gray-700/70 text-white p-2 rounded-full pointer-events-auto hover:bg-gray-800 transition-colors"
              disabled={isTransitioning}
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {alumniData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 w-8 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselPage;
