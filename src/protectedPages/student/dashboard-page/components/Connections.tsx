import { Users, UserPlus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function ConnectionPage({connections=0,yourNetworks = {postLength: 0, followerLength:0,followingLength:0}}: {connections: (number | undefined), yourNetworks: ({ postLength: number, followerLength: number, followingLength: number }) | undefined}) {
  const { postLength, followerLength, followingLength } = yourNetworks;
  const navigate = useNavigate();
  const goToConnections = () => navigate('/connections');
  // const goToJobs = () => navigate('/jobs');
  const followers = followerLength || 0;
  const following = followingLength || 0;
  const posts = postLength || 0;


  return (
    <div className="mb-6 flex flex-wrap w-full gap-6">
      {/* Connections */}
      <div className="flex-1 min-w-[240px] bg-white p-4 rounded-lg w-2/5 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-lg font-semibold">Your Connections</h2>
        <p className="text-sm text-gray-500 mb-3">Alumni you've connected with</p>
        <div className="flex items-center justify-between flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#95323d]/10 hover:bg-[#95323d]/20 transition-colors duration-200">
              <Users className="h-6 w-6 text-[#95323d] hover:scale-110 transition-transform duration-200" />
            </div>
            <div className="text-3xl font-bold text-[#95323d] hover:scale-105 transition-transform duration-200">{connections}</div>
          </div>
          <button 
            onClick={goToConnections} 
            className="flex items-center justify-center bg-[#95323d] text-white hover:bg-[#c04757] font-semibold py-3 px-6 rounded-lg w-full max-w-lg shadow-md hover:scale-[1.01] transition-all duration-200"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Find More
          </button>
        </div>
      </div>

      {/* Network */}
      <div className="flex-1 min-w-[240px] bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-lg font-semibold">Your Network</h2>
        <p className="text-sm text-gray-500 mb-3">Your social activity</p>
        <div className="space-y-2">
          {[
            { label: "Followers", value: followers },
            { label: "Following", value: following },
            { label: "Posts", value: posts }
          ].map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between py-1 group-hover:bg-gray-50 transition-colors duration-200 px-2 rounded">
                <div className="text-sm text-gray-600">{item.label}</div>
                <div className="font-medium text-[#95323d] group-hover:scale-105 transition-transform duration-200">{item.value}</div>
              </div>
              {index < 2 && <div className="border-b border-gray-100"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Jobs */}
      {/* <div className="flex-1 min-w-[240px] bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-lg font-semibold">Job Opportunities</h2>
        <p className="text-sm text-gray-500 mb-3">Matching your profile</p>
        <div className="flex items-center flex-col gap-6 justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#95323d]/10 hover:bg-[#95323d]/20 transition-colors duration-200">
              <Briefcase className="h-6 w-6 text-[#95323d] hover:scale-110 transition-transform duration-200" />
            </div>
            <div className="text-3xl font-bold text-[#95323d] hover:scale-105 transition-transform duration-200">{jobs}</div>
          </div>
          <button 
            onClick={goToJobs} 
            className="flex items-center justify-center bg-[#95323d] text-white hover:bg-[#c04757] font-semibold py-3 px-6 rounded-lg w-full max-w-lg shadow-md hover:scale-[1.01] transition-all duration-200"
          >
            View All
          </button>
        </div>
      </div> */}
    </div>
  )
};

export default ConnectionPage;