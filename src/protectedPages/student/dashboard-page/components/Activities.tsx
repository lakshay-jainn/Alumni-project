import { Calendar, Briefcase, Users, ChevronRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Activities() {
    const navigate = useNavigate();
    const goToEvents = () => navigate('/events');
    const goToProfile = () => navigate('/profile');

    return (
        <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-6 p-0 lg:p-0">
            {/* Upcoming Events Section - Full width on mobile, 70% on desktop */}
            <div className="w-full lg:flex-1 bg-white p-4 lg:p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <div>
                        <h2 className="text-lg lg:text-xl font-semibold">Upcoming Events</h2>
                        <p className="text-xs lg:text-sm text-gray-500">Events you might be interested in</p>
                    </div>
                    <button onClick={goToEvents} className="flex items-center  bg-rose-100 text-rose-500 hover:bg-rose-200  px-2 lg:px-3 py-1 lg:py-2 rounded-md text-sm">
                        View All <ChevronRight className="ml-1 h-3 w-3 lg:h-4 lg:w-4" />
                    </button>
                </div>
                <div className="space-y-3 lg:space-y-4">
                    {[
                        {
                            icon: <Calendar className="h-5 w-5 lg:h-6 lg:w-6" />,
                            title: "Annual Alumni Reunion",
                            details: "May 15, 2025 • 6:00 PM • Grand Hall"
                        },
                        {
                            icon: <Briefcase className="h-5 w-5 lg:h-6 lg:w-6" />,
                            title: "Career Fair",
                            details: "June 3, 2025 • 10:00 AM • Main Campus"
                        },
                        {
                            icon: <Users className="h-5 w-5 lg:h-6 lg:w-6" />,
                            title: "Networking Workshop",
                            details: "June 10, 2025 • 2:00 PM • Conference Room B"
                        }
                    ].map((event, index) => (
                        <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-lg border border-gray-100 p-3 lg:p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                                {event.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-base lg:text-lg">{event.title}</h3>
                                <p className="text-xs lg:text-sm text-gray-500">{event.details}</p>
                            </div>
                            <button className="text-rose-500 border border-rose-200 hover:bg-rose-50 shrink-0 px-3 lg:px-4 py-1 lg:py-2 rounded-md text-xs lg:text-sm w-full sm:w-auto text-center">
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Profile Section - Full width on mobile, 30% on desktop */}
            <div className="w-full lg:w-[350px] bg-white p-4 lg:p-6 rounded-lg shadow-md flex flex-col">
                <div className="flex flex-col items-center text-center mb-4 lg:mb-6">
                    <div className="h-16 w-16 lg:h-24 lg:w-24 mb-3 lg:mb-4 border-2 border-rose-100 rounded-full bg-gray-100 flex items-center justify-center">
                        
                            <User className="w-10 h-50" />
                           
                    </div>
                    <h2 className="text-lg lg:text-xl font-semibold">Ben10</h2>
                    <p className="text-xs lg:text-sm text-gray-500">Class of 2006 • Astronomy</p>
                    <div className="flex flex-col gap-2 mt-3 lg:mt-4">
                        <span className="bg-rose-100 text-rose-600 hover:bg-rose-200 px-2 lg:px-3 py-1 rounded-full text-xs font-medium">
                            Student
                        </span>
                        <span className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-2 lg:px-3 py-1 rounded-full text-xs font-medium">
                            Mentor
                        </span>
                    </div>
                </div>
                <button onClick={goToProfile} className="w-full bg-rose-100 text-rose-500 hover:bg-rose-200  mt-auto py-2 lg:py-3 text-sm lg:text-md rounded-md">
                    Edit Profile
                </button>
            </div>
        </div>
    );
}

export default Activities;
