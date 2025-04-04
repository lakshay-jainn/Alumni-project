import { Users, UserPlus, Briefcase } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function ConnectionPage() {
  const navigate = useNavigate();
  const goToConnections = () => navigate('/connections');
  const goToJobs = () => navigate('/jobs') ;
  const connections = 69;
  const followers = 45;
  const following = 19;
  const posts = 5;
  const jobs = 12;

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
            <div className="text-3xl font-bold">{connections}</div>
          </div>
          <button onClick={goToConnections} className="flex items-center justify-center bg-[#95323d] text-white hover:bg-[#c04757] font-semibold py-3 px-6 rounded-lg w-full max-w-lg shadow-md">
            <UserPlus className="mr-2 h-5 w-5" />
            Find More
          </button>
        </div>
      </div>

      {/* Network */}
      <div className="flex-1 min-w-[240px] bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Your Network</h2>
        <p className="text-sm text-gray-500 mb-3">Your social activity</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-1">
            <div className="text-sm text-gray-600">Followers</div>
            <div className="font-medium">{followers}</div>
          </div>
          <div className="border-b border-gray-100"></div>
          <div className="flex items-center justify-between py-1">
            <div className="text-sm text-gray-600">Following</div>
            <div className="font-medium">{following}</div>
          </div>
          <div className="border-b border-gray-100"></div>
          <div className="flex items-center justify-between py-1">
            <div className="text-sm text-gray-600">Posts</div>
            <div className="font-medium">{posts}</div>
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
            <div className="text-3xl font-bold">{jobs}</div>
          </div>
          <button onClick={goToJobs} className="flex items-center justify-center bg-rose-100 text-rose-500 hover:bg-rose-200 font-semibold py-3 px-6 rounded-lg w-full max-w-lg shadow-md">
            View All
          </button>
        </div>
      </div>
    </div>
  )
  

};
export default ConnectionPage;


