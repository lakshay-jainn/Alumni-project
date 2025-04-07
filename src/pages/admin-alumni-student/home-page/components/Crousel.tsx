import { useState } from 'react';
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
      image: `5.jpg`,
      position: "Actor",
      graduationYear: "1988",
      achievement: "Bollywood superstar and global icon, graduated from Hansraj College."
    },
    {
      id: 2,
      name: "D.K. Joshi",
      image: `5.jpg`,
      position: "Admiral",
      graduationYear: "1972",
      achievement: "Former Chief of Naval Staff of India."
    },
    {
      id: 3,
      name: "Kushal Tandon",
      image: `5.jpg`,
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
  const [imageError, setImageError] = useState(new Array(alumniData.length).fill(false));

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

  // Handle image load and error
  const handleImageLoad = (index: number) => {
    const newLoaded = [...imageLoaded];
    newLoaded[index] = true;
    setImageLoaded(newLoaded);
  };

  const handleImageError = (index: number) => {
    const newError = [...imageError];
    newError[index] = true;
    setImageError(newError);
    // Mark as loaded to remove any loading spinner if present
    handleImageLoad(index);
  };

  return (
    <div className="w-full">
      {/* Mobile View */}
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
      
    </div>
  );
};

export default CarouselPage;
