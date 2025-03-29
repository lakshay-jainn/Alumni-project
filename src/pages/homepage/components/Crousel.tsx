import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Calendar } from 'lucide-react';

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
  // Sample alumni data
  const alumniData: AlumniMember[] = [
    {
      id: 1,
      name: "Shahruk Khan",
      image: "https://cdn.britannica.com/53/252753-050-BF625495/Actor-India-Shah-Rukh-Khan-2011.jpg",
      position: "Actor",
      graduationYear: "2005",
      achievement: "Iconic Bollywood Star known for his versatile acting across genres."
    },
    {
      id: 2,
      name: "Lorem Ipsum",
      image: "api/placeholder/400/400",
      position: "Author",
      graduationYear: "2008",
      achievement: "Renowned for literary work."
    },
    {
      id: 3,
      name: "Lorem Ipsum",
      image: "api/placeholder/400/400",
      position: "Singer",
      graduationYear: "2008",
      achievement: "Renowned for literary work."
    },
    {
      id: 4,
      name: "Lorem Ipsum",
      image: "api/placeholder/400/400",
      position: "writer",
      graduationYear: "2008",
      achievement: "Renowned for literary work."
    }
  ];

  // Sample events data
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

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(
    new Array(alumniData.length).fill(false)
  );

  // Navigation functions
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % alumniData.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? alumniData.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 700);
  };

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && !isHovering && !isTransitioning) {
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovering, isTransitioning]);

  // Handle image load
  const handleImageLoad = (index: number) => {
    const newLoaded = [...imageLoaded];
    newLoaded[index] = true;
    setImageLoaded(newLoaded);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Mobile View (Stacked) */}
      <div className="md:hidden flex flex-col gap-6">
        {/* Events Section */}
        <div className="w-full rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all">
          <div className="bg-indigo-700 text-white p-4 flex items-center">
            <Calendar size={20} className="mr-2" />
            <h2 className="text-xl font-bold">Upcoming Events</h2>
          </div>
          <div className="p-3 h-auto max-h-64 overflow-y-auto">
            {events.map((event, index) => (
              <div key={index} className="p-4 mb-2 bg-white rounded-md shadow-sm border border-gray-100 hover:scale-[1.02] transition-transform duration-300">
                <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>
                <p className="text-sm text-indigo-600 mt-1">{event.date}</p>
                <p className="text-sm mt-2 text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Section */}
        <div 
          className="w-full h-96 relative rounded-lg shadow-lg overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div 
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {alumniData.map((alumni, index) => (
              <div key={alumni.id} className="min-w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-4">
                <div className="flex flex-col bg-white/10 backdrop-blur-md rounded-lg shadow-md w-full h-full border border-white/20 overflow-hidden">
                  {/* Image Section */}
                  <div className="h-1/2 w-full relative">
                    {!imageLoaded[index] && (
                      <div className="absolute h-full w-full bg-gray-700 animate-pulse"></div>
                    )}
                    <img
                      src={alumni.image}
                      alt={alumni.name}
                      className={`absolute h-full w-full object-cover ${imageLoaded[index] ? '' : 'hidden'}`}
                      onLoad={() => handleImageLoad(index)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/default-profile.jpg';
                        handleImageLoad(index);
                      }}
                    />
                  </div>
                  
                  {/* Text Section */}
                  <div className="h-1/2 p-4 overflow-y-auto">
                    <h3 className="text-xl font-bold text-white mb-2">{alumni.name}</h3>
                    <div className="flex items-center mb-3 flex-wrap gap-2">
                      <span className="bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {alumni.position}
                      </span>
                      <span className="text-white/80 text-sm">Class of {alumni.graduationYear}</span>
                    </div>
                    <p className="text-white/80 text-sm leading-normal">
                      {alumni.achievement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
            <button
              onClick={prevSlide}
              className="bg-black/30 text-white p-2 rounded-full pointer-events-auto hover:bg-black/50 transition-colors focus:outline-none"
              disabled={isTransitioning}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-black/30 text-white p-2 rounded-full pointer-events-auto hover:bg-black/50 transition-colors focus:outline-none"
              disabled={isTransitioning}
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Play/Pause Button */}
          <div className="absolute bottom-2 right-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white/20 p-1 rounded-full hover:bg-white/30 focus:outline-none"
              aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {alumniData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white scale-110' : 'bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View (Side-by-side) */}
      <div className="hidden md:flex gap-6 h-[33vh] min-h-[400px]">
        {/* Events Section */}
        <div className="w-1/3 rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all">
          <div className="bg-indigo-700 text-white p-4 flex items-center">
            <Calendar size={20} className="mr-2" />
            <h2 className="text-xl font-bold">Upcoming Events</h2>
          </div>
          <div className="p-3 overflow-y-auto h-[calc(100%-60px)]">
            {events.map((event, index) => (
              <div key={index} className="p-4 mb-2 bg-white rounded-md shadow-sm border border-gray-100 hover:scale-[1.02] transition-transform duration-300">
                <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>
                <p className="text-sm text-indigo-600 mt-1">{event.date}</p>
                <p className="text-sm mt-2 text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Section */}
        <div 
          className="w-2/3 relative rounded-lg shadow-lg overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div 
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {alumniData.map((alumni, index) => (
              <div key={alumni.id} className="min-w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-4">
                <div className="flex flex-row bg-white/10 backdrop-blur-md rounded-lg shadow-md w-full max-w-4xl h-[80%] border border-white/20 overflow-hidden">
                  {/* Image Section */}
                  <div className="w-1/3 flex-shrink-0 relative">
                    {!imageLoaded[index] && (
                      <div className="absolute h-full w-full bg-gray-700 animate-pulse"></div>
                    )}
                    <img
                      src={alumni.image}
                      alt={alumni.name}
                      className={`absolute h-full w-full object-cover ${imageLoaded[index] ? '' : 'hidden'}`}
                      onLoad={() => handleImageLoad(index)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/default-profile.jpg';
                        handleImageLoad(index);
                      }}
                    />
                  </div>
                  
                  {/* Text Section */}
                  <div className="w-2/3 p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-3">{alumni.name}</h3>
                    <div className="flex items-center mb-4">
                      <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {alumni.position}
                      </span>
                      <span className="ml-3 text-white/80">Class of {alumni.graduationYear}</span>
                    </div>
                    <p className="text-white/90 leading-relaxed">
                      {alumni.achievement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
            <button
              onClick={prevSlide}
              className="bg-black/30 text-white p-3 rounded-full pointer-events-auto hover:bg-black/50 transition-colors focus:outline-none"
              disabled={isTransitioning}
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-black/30 text-white p-3 rounded-full pointer-events-auto hover:bg-black/50 transition-colors focus:outline-none"
              disabled={isTransitioning}
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Play/Pause Button */}
          <div className="absolute bottom-4 right-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white/20 p-2 rounded-full hover:bg-white/30 focus:outline-none"
              aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {alumniData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white scale-110' : 'bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselPage;