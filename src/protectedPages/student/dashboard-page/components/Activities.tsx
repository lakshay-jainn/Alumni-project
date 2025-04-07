import { Calendar, ChevronRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Event,Profile } from "@/api/types/pageTypes";
export function Activities({events,profile} : {events: (Event[] | undefined),profile: (Profile | undefined)}) {
    const navigate = useNavigate();
    const goToEvents = () => navigate('/events');
    const goToProfile = () => navigate('/profile');
    console.log(profile?.profileImage);
    return (
        <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-6 p-0 lg:p-0">
            {/* Upcoming Events Section */}
            <div className="w-full lg:flex-1 bg-white p-4 lg:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <div>
                        <h2 className="text-lg lg:text-xl font-semibold">Upcoming Events</h2>
                        <p className="text-xs lg:text-sm text-gray-500">Events you might be interested in</p>
                    </div>
                    <button 
                        onClick={goToEvents} 
                        className="flex items-center bg-[#95323d] text-white hover:bg-[#c04757] px-2 lg:px-3 py-1 lg:py-2 rounded-md text-sm transition-colors duration-200"
                    >
                        View All <ChevronRight className="ml-1 h-3 w-3 lg:h-4 lg:w-4" />
                    </button>
                </div>
                <div className="space-y-3 lg:space-y-4">
                    {(events && events.length!=0) ? events.map((event) => (
                        <div 
                            key={event.id} 
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-lg border border-gray-100 p-3 lg:p-4 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.01]"
                        >
                            <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-[#95323d]/10 hover:bg-[#95323d]/20 transition-colors duration-200">
                                <Calendar className="h-5 w-5 lg:h-6 lg:w-6 text-[#95323d]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-base lg:text-lg">{event.title}</h3>
                                <p className="text-xs lg:text-sm text-gray-500">{event.time && event.time +" "+ "•"}  {event.location && event.location}</p>
                            </div>
                            <button className="bg-[#95323d] text-white hover:bg-[#c04757] shrink-0 px-3 lg:px-4 py-1 lg:py-2 rounded-md text-xs lg:text-sm w-full sm:w-auto text-center transition-colors duration-200">
                                View
                            </button>
                        </div>
                    )) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-gray-500">No upcoming events</p>
                    </div>)}
                </div>
            </div>

            {/* Profile Section */}
            <div className="w-full lg:w-[350px] bg-white p-4 lg:p-6 rounded-lg shadow-md flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center text-center mb-4 lg:mb-6">
                    {
                        !profile?.profileImage ? (
                            <div className="h-16 w-16 lg:h-24 lg:w-24 mb-3 lg:mb-4 border-2 border-[#95323d]/20 rounded-full bg-gray-100 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                                <User className="w-10 h-10 text-[#95323d] transition-transform duration-200 hover:scale-110" />
                            </div>
                        ) : (
                            <img src={profile.profileImage} className="h-16 w-16 lg:h-24 lg:w-24 mb-3 lg:mb-4 border-2 border-[#95323d]/20 rounded-full bg-gray-100 hover:scale-105 transition-transform duration-200" alt="" />
                        )
                    }
                    
                    <h2 className="text-lg lg:text-xl font-semibold">{profile?.firstName} {profile?.lastName && profile.lastName}</h2>
                    <p className="text-xs lg:text-sm text-gray-500">{ (profile?.batch && profile.course && profile.courseSpecialization) ? ("Class of" + " " + profile.batch + "•" + profile?.course + " " +  profile?.courseSpecialization):"" }</p>
                    <div className="flex flex-col gap-2 mt-3 lg:mt-4">
                        <span className="bg-[#95323d]/10 text-[#95323d] hover:bg-[#95323d]/20 px-2 lg:px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200">
                            {profile?.role }
                        </span>
                        {/* <span className="bg-[#95323d]/10 text-[#95323d] hover:bg-[#95323d]/20 px-2 lg:px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200">
                            Mentor
                        </span> */}
                    </div>
                </div>
                <button 
                    onClick={goToProfile} 
                    className="w-full bg-[#95323d] text-white hover:bg-[#c04757] mt-auto py-2 lg:py-3 text-sm lg:text-md rounded-md transition-colors duration-200 hover:scale-[1.01]"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
}