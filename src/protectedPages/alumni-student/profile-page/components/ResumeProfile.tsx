
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Plus, Upload } from "lucide-react"

export default function ResumeProfile({setActiveSection, setEditProfileModal}:{setActiveSection: React.Dispatch<React.SetStateAction<"basic" | "resume" | "about" | "skills" | "education" | "work" | "accomplishments" | "personal" | "social">>, setEditProfileModal: (value: boolean) => void}) {
  return (
    <div className="mx-auto p-4 bg-white">
      {/* About Section */}
      <div className="border-b pb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium text-gray-800">About</h2>
          <button onClick={()=>(setActiveSection('about'),setEditProfileModal(true))} className="text-gray-500">
            <Pencil size={16} />
          </button>
        </div>
        <p className="text-sm text-gray-600">»»»!œ∑´®†¥¨ˆøπ"'åß∂ƒ©˙∆˚¬…æ</p>
      </div>

      {/* Resume Section */}
      <div className="border-b py-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium text-blue-600">Resume</h2>
        </div>
        <div className="bg-blue-50 p-4 rounded-md flex items-start">
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">Add your Resume & get your profile filled in a click!</p>
            <p className="text-xs text-gray-600 mb-2">
              Adding your Resume helps you to tell who you are and what makes you different—to employers and recruiters.
            </p>
            <Button
                onClick={()=>(setActiveSection('resume'),setEditProfileModal(true))}
              size="sm"
              variant="outline"
              className="text-blue-600 text-xs flex items-center gap-1 border-blue-600"
            >
              <Upload size={14} />
              Upload Resume
            </Button>
          </div>
          <div className="ml-2">
            {/* <img
              src="/placeholder.svg?height=60&width=60"
              alt="Resume icon"
              width={60}
              height={60}
              className="opacity-70"
            /> */}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="border-b py-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium text-gray-800">Skills</h2>
          <button onClick={()=>(setActiveSection('skills'),setEditProfileModal(true))} className="text-gray-500">
            <Pencil size={16} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="rounded-full bg-gray-100 hover:bg-gray-100 text-gray-800 border-gray-300">
            Python
          </Badge>
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="border-b py-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium text-gray-800">Work Experience</h2>
          <button onClick={()=>(setActiveSection('work'),setEditProfileModal(true))} className="text-gray-500">
            <Pencil size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-600 mb-3">
          Narrate your professional journey and fast-track your way to new career heights!
        </p>
        <Button onClick={()=>(setActiveSection('work'),setEditProfileModal(true))} variant="outline" size="sm" className="text-blue-600 text-xs border-blue-600">
          Add Work Experience
        </Button>
        <div className="flex justify-end mt-2">
          {/* <img
            src="/placeholder.svg?height=40&width=40"
            alt="Work icon"
            width={40}
            height={40}
            className="opacity-70"
          /> */}
        </div>
      </div>

      {/* Education Section */}
      <div className="border-b py-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium text-gray-800">Education</h2>
          <div className="flex items-center gap-2">
            <button onClick={()=>(setActiveSection('education'),setEditProfileModal(true)) }  className="text-gray-500">
              <Plus size={16} />
            </button>
            <button onClick={()=>(setActiveSection('education'),setEditProfileModal(true)) } className="text-gray-500">
              <Pencil size={16} />
            </button>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-md text-xs font-bold">HA</div>
          <div className="flex-1">
            <p className="font-medium text-sm">Harvard College</p>
            <div className="flex flex-wrap gap-1 text-xs text-gray-600 mt-1">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Graduation
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                BS (Bachelor of Science)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Computer Science
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                2024 - Present Full-time
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsibilities Section */}
      <div className="border-b py-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium text-gray-800">Responsibilities</h2>
          <button className="text-gray-500">
            <Pencil size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-600 mb-3">
          Highlight the responsibilities you've mastered to demonstrate your leadership and expertise!
        </p>
        <Button variant="outline" size="sm" className="text-blue-600 text-xs border-blue-600">
          Add Responsibility
        </Button>
        <div className="flex justify-end mt-2">
          {/* <img
            src="/placeholder.svg?height=40&width=40"
            alt="Responsibility icon"
            width={40}
            height={40}
            className="opacity-70"
          /> */}
        </div>
      </div>

      {/* Certificate Section */}
      <div className="border-b py-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium text-gray-800">Certificate</h2>
          <div className="flex items-center gap-2">
            <button className="text-gray-500">
              <Plus size={16} />
            </button>
            <button className="text-gray-500">
              <Pencil size={16} />
            </button>
          </div>
        </div>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-md text-xs font-bold">HA</div>
          <div className="flex-1">
            <p className="font-medium text-sm">Ignite 360 4.0 Executive Edge</p>
            <p className="text-xs text-gray-600">Amity Business College (ABC), University of California</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-md overflow-hidden">
            <div className="w-full h-full bg-red-500 flex items-center justify-center text-white">★</div>
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">StackScape Round 2 Submission</p>
            <p className="text-xs text-gray-600">St. Stephen's College, Delhi University</p>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="border-b py-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium text-gray-800">Projects</h2>
          <button className="text-gray-500">
            <Pencil size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-600 mb-3">
          Unveil your projects to the world and pave your path to professional greatness!
        </p>
        <Button variant="outline" size="sm" className="text-blue-600 text-xs border-blue-600">
          Add Project
        </Button>
        <div className="flex justify-end mt-2">
          {/* <img
            src="/placeholder.svg?height=40&width=40"
            alt="Project icon"
            width={40}
            height={40}
            className="opacity-70"
          /> */}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="border-b py-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium text-gray-800">Achievements</h2>
          <button className="text-gray-500">
            <Pencil size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-600 mb-3">
          Showcase your triumphs and make a remarkable impression on industry leaders!
        </p>
        <Button variant="outline" size="sm" className="text-blue-600 text-xs border-blue-600">
          Add Achievement
        </Button>
        <div className="flex justify-end mt-2">
          {/* <img
            src="/placeholder.svg?height=40&width=40"
            alt="Achievement icon"
            width={40}
            height={40}
            className="opacity-70"
          /> */}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="py-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium text-gray-800">Social Links</h2>
          <button className="text-gray-500">
            <Plus size={16} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "facebook",
            "twitter",
            "linkedin",
            "youtube",
            "instagram",
            "github",
            "dribbble",
            "behance",
            "medium",
            "stackoverflow",
            "pinterest",
            "discord",
          ].map((social) => (
            <div key={social} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-xs">{social.charAt(0)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

