
import {
  Bell,
  Calendar,
  Home,
  MessageSquare,
  Search,
  Settings,
  Users,
  UserPlus,
  Briefcase,
  BookOpen,
  LogOut,
  ChevronRight,
  Mail,
  Menu,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function AlumniDashboard() {
  

  return (
          
          <div className="mb-6 flex flex-wrap w-full gap-6">
            {/* Connectionssss */}
            <div className="flex-1 min-w-[240px] bg-white p-4 rounded-lg w-2/5 shadow-md">
              <h2 className="text-lg font-semibold">Your Connections</h2>
              <p className="text-sm text-gray-500 mb-3">Alumni you've connected with</p>
              <div className="flex items-center justify-between flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-3xl font-bold">69</div>
                </div>
                <Button className="bg-rose-100 hover:bg-rose-200 text-rose-600 border-0 w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Find More
                </Button>
              </div>
            </div>

            {/* Network */}
            <div className="flex-1 min-w-[240px] bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Your Network</h2>
              <p className="text-sm text-gray-500 mb-3">Your social activity</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-1">
                  <div className="text-sm text-gray-600">Followers</div>
                  <div className="font-medium">45</div>
                </div>
                <div className="border-b border-gray-100"></div>
                <div className="flex items-center justify-between py-1">
                  <div className="text-sm text-gray-600">Following</div>
                  <div className="font-medium">46</div>
                </div>
                <div className="border-b border-gray-100"></div>
                <div className="flex items-center justify-between py-1">
                  <div className="text-sm text-gray-600">Posts</div>
                  <div className="font-medium">5</div>
                </div>
              </div>
            </div>

            {/* Jobsssss */}
            <div className="flex-1 min-w-[240px] bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Job Opportunities</h2>
              <p className="text-sm text-gray-500 mb-3">Matching your profile</p>
              <div className="flex items-center flex-col gap-6 justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <Briefcase className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-3xl font-bold">12</div>
                </div>
                <Button className="bg-rose-100 hover:bg-rose-200 text-rose-600 border-0 w-full ">View All</Button>
              </div>
            </div>
          </div>
  )
          {/* div Content Sections */}
        //   <div className="flex flex-col md:flex-row gap-6">
        //     {/* Left Column */}
        //     <div className="flex-1 min-w-0">
        //       {/* Upcoming Events Section */}
        //       <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        //         <div className="flex items-center justify-between mb-4">
        //           <div>
        //             <h2 className="text-lg font-semibold">Upcoming Events</h2>
        //             <p className="text-sm text-gray-500">Events you might be interested in</p>
        //           </div>
        //           <Button variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50">
        //             View All <ChevronRight className="ml-1 h-4 w-4" />
        //           </Button>
        //         </div>
        //         <div className="space-y-3">
        //           <div className="flex items-center gap-4 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 transition-colors">
        //             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-500">
        //               <Calendar className="h-6 w-6" />
        //             </div>
        //             <div className="flex-1 min-w-0">
        //               <h3 className="font-medium">Annual Alumni Reunion</h3>
        //               <p className="text-sm text-gray-500 truncate">May 15, 2025 • 6:00 PM • Grand Hall</p>
        //             </div>
        //             <Button
        //               size="sm"
        //               variant="outline"
        //               className="text-rose-500 border-rose-200 hover:bg-rose-50 shrink-0"
        //             >
        //               RSVP
        //             </Button>
        //           </div>
        //           <div className="flex items-center gap-4 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 transition-colors">
        //             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-500">
        //               <Briefcase className="h-6 w-6" />
        //             </div>
        //             <div className="flex-1 min-w-0">
        //               <h3 className="font-medium">Career Fair</h3>
        //               <p className="text-sm text-gray-500 truncate">June 3, 2025 • 10:00 AM • div Campus</p>
        //             </div>
        //             <Button
        //               size="sm"
        //               variant="outline"
        //               className="text-rose-500 border-rose-200 hover:bg-rose-50 shrink-0"
        //             >
        //               RSVP
        //             </Button>
        //           </div>
        //           <div className="flex items-center gap-4 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 transition-colors">
        //             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-500">
        //               <Users className="h-6 w-6" />
        //             </div>
        //             <div className="flex-1 min-w-0">
        //               <h3 className="font-medium">Networking Workshop</h3>
        //               <p className="text-sm text-gray-500 truncate">June 10, 2025 • 2:00 PM • Conference Room B</p>
        //             </div>
        //             <Button
        //               size="sm"
        //               variant="outline"
        //               className="text-rose-500 border-rose-200 hover:bg-rose-50 shrink-0"
        //             >
        //               RSVP
        //             </Button>
        //           </div>
        //         </div>
        //       </div>

        //       {/* Recent Chats Section */}
        //       <div className="bg-white p-4 rounded-lg shadow-sm">
        //         <div className="flex items-center justify-between mb-4">
        //           <div>
        //             <h2 className="text-lg font-semibold">Recent Chats</h2>
        //             <p className="text-sm text-gray-500">Your recent conversations</p>
        //           </div>
        //           <Button variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50">
        //             View All <ChevronRight className="ml-1 h-4 w-4" />
        //           </Button>
        //         </div>
        //         <div className="space-y-3">
        //           <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors">
        //             <Avatar className="h-12 w-12 border border-gray-200">
        //               <AvatarImage src="/placeholder.svg" alt="Sarah Johnson" />
        //               <AvatarFallback>SJ</AvatarFallback>
        //             </Avatar>
        //             <div className="flex-1 min-w-0">
        //               <div className="flex items-center justify-between">
        //                 <h3 className="font-medium">Sarah Johnson</h3>
        //                 <span className="text-xs text-gray-500 shrink-0">2h ago</span>
        //               </div>
        //               <p className="text-sm text-gray-600 truncate">Looking forward to seeing you at the reunion!</p>
        //             </div>
        //           </div>
        //           <div className="border-b border-gray-100"></div>
        //           <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors">
        //             <Avatar className="h-12 w-12 border border-gray-200">
        //               <AvatarImage src="/placeholder.svg" alt="Michael Chen" />
        //               <AvatarFallback>MC</AvatarFallback>
        //             </Avatar>
        //             <div className="flex-1 min-w-0">
        //               <div className="flex items-center justify-between">
        //                 <h3 className="font-medium">Michael Chen</h3>
        //                 <span className="text-xs text-gray-500 shrink-0">Yesterday</span>
        //               </div>
        //               <p className="text-sm text-gray-600 truncate">
        //                 Do you have time to discuss the mentorship program?
        //               </p>
        //             </div>
        //           </div>
        //           <div className="border-b border-gray-100"></div>
        //           <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors">
        //             <Avatar className="h-12 w-12 border border-gray-200">
        //               <AvatarImage src="/placeholder.svg" alt="Priya Patel" />
        //               <AvatarFallback>PP</AvatarFallback>
        //             </Avatar>
        //             <div className="flex-1 min-w-0">
        //               <div className="flex items-center justify-between">
        //                 <h3 className="font-medium">Priya Patel</h3>
        //                 <span className="text-xs text-gray-500 shrink-0">3d ago</span>
        //               </div>
        //               <p className="text-sm text-gray-600 truncate">
        //                 Thanks for connecting me with the hiring manager!
        //               </p>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>

        //     {/* Right Column */}
        //     <div className="w-full md:w-[320px] space-y-6">
        //       {/* Profile Summary */}
        //       <div className="bg-white p-4 rounded-lg shadow-sm">
        //         <div className="flex flex-col items-center text-center mb-4">
        //           <Avatar className="h-20 w-20 mb-3 border-2 border-rose-100">
        //             <AvatarImage src="/placeholder.svg" alt="Jane Doe" />
        //             <AvatarFallback>JD</AvatarFallback>
        //           </Avatar>
        //           <h2 className="text-lg font-semibold">Jane Doe</h2>
        //           <p className="text-sm text-gray-500">Class of 2020 • Computer Science</p>
        //           <div className="flex gap-2 mt-3">
        //             <Badge className="bg-rose-100 text-rose-600 hover:bg-rose-200">Alumni</Badge>
        //             <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200">Mentor</Badge>
        //           </div>
        //         </div>
        //         <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white">Edit Profile</Button>
        //       </div>

        //       {/* Recommended Connections */}
        //       <div className="bg-white p-4 rounded-lg shadow-sm">
        //         <h2 className="text-lg font-semibold mb-1">Recommended Connections</h2>
        //         <p className="text-sm text-gray-500 mb-4">People you may know</p>
        //         <div className="space-y-3">
        //           <div className="flex items-center gap-3">
        //             <Avatar className="h-10 w-10 border border-gray-200">
        //               <AvatarImage src="/placeholder.svg" alt="Alex Wong" />
        //               <AvatarFallback>AW</AvatarFallback>
        //             </Avatar>
        //             <div className="flex-1 min-w-0">
        //               <h3 className="font-medium text-sm">Alex Wong</h3>
        //               <p className="text-xs text-gray-500 truncate">Software Engineer at Google</p>
        //             </div>
        //             <Button size="sm" variant="outline" className="h-8 w-8 p-0">
        //               <UserPlus className="h-4 w-4" />
        //             </Button>
        //           </div>
        //           <div className="border-b border-gray-100"></div>
        //           <div className="flex items-center gap-3">
        //             <Avatar className="h-10 w-10 border border-gray-200">
        //               <AvatarImage src="/placeholder.svg" alt="Emma Garcia" />
        //               <AvatarFallback>EG</AvatarFallback>
        //             </Avatar>
        //             <div className="flex-1 min-w-0">
        //               <h3 className="font-medium text-sm">Emma Garcia</h3>
        //               <p className="text-xs text-gray-500 truncate">Product Manager at Microsoft</p>
        //             </div>
        //             <Button size="sm" variant="outline" className="h-8 w-8 p-0">
        //               <UserPlus className="h-4 w-4" />
        //             </Button>
        //           </div>
        //           <div className="border-b border-gray-100"></div>
        //           <div className="flex items-center gap-3">
        //             <Avatar className="h-10 w-10 border border-gray-200">
        //               <AvatarImage src="/placeholder.svg" alt="David Kim" />
        //               <AvatarFallback>DK</AvatarFallback>
        //             </Avatar>
        //             <div className="flex-1 min-w-0">
        //               <h3 className="font-medium text-sm">David Kim</h3>
        //               <p className="text-xs text-gray-500 truncate">UX Designer at Apple</p>
        //             </div>
        //             <Button size="sm" variant="outline" className="h-8 w-8 p-0">
        //               <UserPlus className="h-4 w-4" />
        //             </Button>
        //           </div>
        //         </div>
        //         <Button variant="ghost" className="w-full mt-3 text-rose-500 hover:text-rose-600 hover:bg-rose-50">
        //           View More
        //         </Button>
        //       </div>

        //       {/* Latest News */}
        //       <div className="bg-white p-4 rounded-lg shadow-sm">
        //         <h2 className="text-lg font-semibold mb-1">Latest News</h2>
        //         <p className="text-sm text-gray-500 mb-4">From your alma mater</p>
        //         <div className="space-y-3">
        //           <div className="group">
        //             <h3 className="font-medium text-sm group-hover:text-rose-500 transition-colors">
        //               University Announces New Tech Innovation Center
        //             </h3>
        //             <p className="text-xs text-gray-500">April 2, 2025</p>
        //           </div>
        //           <div className="border-b border-gray-100"></div>
        //           <div className="group">
        //             <h3 className="font-medium text-sm group-hover:text-rose-500 transition-colors">
        //               Alumni Donation Funds New Scholarship Program
        //             </h3>
        //             <p className="text-xs text-gray-500">March 28, 2025</p>
        //           </div>
        //           <div className="border-b border-gray-100"></div>
        //           <div className="group">
        //             <h3 className="font-medium text-sm group-hover:text-rose-500 transition-colors">
        //               Campus Expansion Project Breaks Ground
        //             </h3>
        //             <p className="text-xs text-gray-500">March 15, 2025</p>
        //           </div>
        //         </div>
        //         <Button variant="ghost" className="w-full mt-3 text-rose-500 hover:text-rose-600 hover:bg-rose-50">
        //           Read More
        //         </Button>
        //       </div>
        //     </div>
        //   </div>
        // </div> */}
      
  
};
export default AlumniDashboard;


