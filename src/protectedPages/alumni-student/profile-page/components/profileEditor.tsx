import { useState } from "react"
import { ArrowLeft, Check, Clock, Eye, FileText, HelpCircle, ChevronDown } from "lucide-react"

export default function ProfileEditor({activeSelection}:{activeSelection:"basic" | "resume" | "about" | "skills" | "education" | "work" | "accomplishments" | "personal" | "social"}) {
  const [activeSection, setActiveSection] = useState<
    "basic" | "resume" | "about" | "skills" | "education" | "work" | "accomplishments" | "personal" | "social"
  >(activeSelection)
  const [gender, setGender] = useState<"male" | "female" | "other">("male")
  const [userType, setUserType] = useState<"college" | "professional" | "school" | "fresher">("college")

  // Function to render the appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "basic":
        return (
          <BasicDetailsContent gender={gender} setGender={setGender} userType={userType} setUserType={setUserType} />
        )
      case "education":
        return <EducationContent />
      default:
        return <div className="flex items-center justify-center h-full">Content for {activeSection} section</div>
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center h-16 px-4 border-b bg-white">
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-2">
          <ArrowLeft className="w-4 h-4 text-blue-600" />
        </button>
        <h1 className="text-lg font-medium text-gray-700">Edit Profile</h1>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <div className="w-full md:w-[400px] border-r bg-white overflow-auto">
          {/* Resume button */}
          <div className="p-4">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-3 p-4 rounded-md">
              <div className="w-12 h-12 rounded-md overflow-hidden border-2 border-yellow-400 flex-shrink-0">
                <img
                  src="/placeholder.svg?height=48&width=48"
                  alt="Profile"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span className="font-medium">Create your Resume</span>
              </div>
            </button>
          </div>

          {/* Progress */}
          <div className="px-4 py-5 bg-blue-50 mx-4 rounded-md mb-4">
            <h2 className="text-lg font-medium text-gray-800">Complete your profile</h2>
            <p className="text-sm text-gray-600 mb-3">And standout to recruiters!</p>
            <div className="relative">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "75%" }}></div>
              </div>
              <span className="absolute right-0 top-3 text-sm text-green-600 font-medium">75%</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <ul className="space-y-1">
              <NavItem
                icon={
                  activeSection === "basic" ? (
                    <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center"></div>
                  )
                }
                highlight={activeSection === "basic"}
                label="Basic Details"
                required
                active={activeSection === "basic"}
                onClick={() => setActiveSection("basic")}
              />
              <NavItem
                icon={<Clock className="w-5 h-5 text-gray-400" />}
                label="Resume"
                highlight={activeSection === "resume"}
                active={activeSection === "resume"}
                onClick={() => setActiveSection("resume")}
              />
              <NavItem
                icon={
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center bg-green-500">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                }
                label="About"
                required
                highlight={activeSection === "about"}
                active={activeSection === "about"}
                onClick={() => setActiveSection("about")}
              />
              <NavItem
                icon={
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center bg-green-500">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                }
                highlight={activeSection === "skills"}
                label="Skills"
                required
                active={activeSection === "skills"}
                onClick={() => setActiveSection("skills")}
              />
              <NavItem
                icon={
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center bg-green-500">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                }
                label="Education"
                required
                active={activeSection === "education"}
                highlight={activeSection === "education"}
                onClick={() => setActiveSection("education")}
              />
              <NavItem
                icon={<Clock className="w-5 h-5 text-gray-400" />}
                label="Work Experience"
                active={activeSection === "work"}
                highlight={activeSection === "work"}
                onClick={() => setActiveSection("work")}
              />
              <NavItem
                icon={<Clock className="w-5 h-5 text-gray-400" />}
                label="Accomplishments & Initiatives"
                active={activeSection === "accomplishments"}
                highlight={activeSection === "accomplishments"}
                onClick={() => setActiveSection("accomplishments")}
              />
              <NavItem
                icon={<Clock className="w-5 h-5 text-gray-400" />}
                label="Personal Details"
                active={activeSection === "personal"}
                highlight={activeSection === "personal"}
                onClick={() => setActiveSection("personal")}
              />
              <NavItem
                icon={<Clock className="w-5 h-5 text-gray-400" />}
                label="Social Links"
                active={activeSection === "social"}
                highlight={activeSection === "social"}
                onClick={() => setActiveSection("social")}
              />
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">{renderContent()}</div>
      </div>
    </div>
  )
}

function NavItem({ icon, label, required = false, active = false, highlight = false, onClick } : { icon: React.ReactNode; label: string; required?: boolean; active?: boolean; highlight?: boolean; onClick: () => void }) {
  return (
    <li>
      <button
        className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-left ${
          active && highlight ? "border-r-4 border-blue-500 bg-blue-50" : ""
        } ${active ? "font-medium text-blue-600" : "text-gray-700"}`}
        onClick={onClick}
      >
        {icon}
        <span>{label}</span>
        {required && (
          <span className="ml-auto text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded">Required</span>
        )}
      </button>
    </li>
  )
}

function FormField({ label, children, required = false }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <label className="text-gray-700">{label}</label>
        {required && <span className="text-red-500 ml-1">*</span>}
      </div>
      {children}
    </div>
  )
}

function BasicDetailsContent({ gender, setGender, userType, setUserType } : {gender: "male" | "female" | "other"; setGender: (value: "male" | "female" | "other") => void; userType: "college" | "professional" | "school" | "fresher"; setUserType: (value: "college" | "professional" | "school" | "fresher") => void}) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
          </div>
          <h2 className="text-lg font-medium">Basic Details</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500">
            <Eye className="w-5 h-5" />
          </button>
          <button className="text-gray-500">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative">
          <img
            src="/placeholder.svg?height=120&width=120"
            width={120}
            height={120}
            alt="Profile Avatar"
            className="rounded-full bg-gray-200"
          />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input type="text" className="w-full p-3 border rounded-md" defaultValue="Lakshay jain" />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm mb-1">Last Name</label>
          <input type="text" className="w-full p-3 border rounded-md" />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm mb-1">
            Username <span className="text-red-500">*</span>
          </label>
          <input type="text" className="w-full p-3 border rounded-md" defaultValue="6690lak8122" />
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input type="email" className="w-full p-3 border rounded-md pr-12" defaultValue="lakshay6690@gmail.com" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 text-sm font-medium">
              <button className="flex items-center">Update Email</button>
            </div>
            <div className="absolute right-0 top-0 -mt-1 -mr-1">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm mb-1">
            Mobile <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <div className="relative">
              <button className="flex items-center gap-1 p-3 border rounded-l-md bg-gray-50 w-20">
                <span>+91</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="relative flex-1">
              <input type="text" className="w-full p-3 border border-l-0 rounded-r-md" defaultValue="9311509100" />
              <div className="absolute right-0 top-0 -mt-1 -mr-1">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gender */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4">
            <button
              className={`flex items-center gap-2 px-4 py-2 border rounded-full ${gender === "male" ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-600"}`}
              onClick={() => setGender("male")}
            >
              <span className="text-lg">♂</span>
              <span>Male</span>
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 border rounded-full ${gender === "female" ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-600"}`}
              onClick={() => setGender("female")}
            >
              <span className="text-lg">♀</span>
              <span>Female</span>
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 border rounded-full ${gender === "other" ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-600"}`}
              onClick={() => setGender("other")}
            >
              <span className="text-lg">👤</span>
              <span>More Options</span>
            </button>
          </div>
        </div>

        {/* User Type */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm mb-1">
            User Type <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4">
            <button
              className={`flex items-center gap-2 px-4 py-2 border rounded-full ${userType === "college" ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-600"}`}
              onClick={() => setUserType("college")}
            >
              <span className="text-lg">🎓</span>
              <span>College Students</span>
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 border rounded-full ${userType === "professional" ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-600"}`}
              onClick={() => setUserType("professional")}
            >
              <span className="text-lg">👔</span>
              <span>Professional</span>
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 border rounded-full ${userType === "school" ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-600"}`}
              onClick={() => setUserType("school")}
            >
              <span className="text-lg">🏫</span>
              <span>School Student</span>
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 border rounded-full ${userType === "fresher" ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-600"}`}
              onClick={() => setUserType("fresher")}
            >
              <span className="text-lg">🌱</span>
              <span>Fresher</span>
            </button>
          </div>
        </div>

        {/* Course */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm mb-1">
            Course <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select className="w-full p-3 border rounded-md appearance-none bg-white pr-10">
              <option>BS (Bachelor of Science)</option>
              <option>BA (Bachelor of Arts)</option>
              <option>BBA (Bachelor of Business Administration)</option>
              <option>B.Tech (Bachelor of Technology)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Course Specialization */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm mb-1">
            Course Specialization <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select className="w-full p-3 border rounded-md appearance-none bg-white pr-10">
              <option>Others</option>
              <option>Computer Science</option>
              <option>Information Technology</option>
              <option>Electronics</option>
              <option>Mechanical</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-full flex items-center gap-2">
          <Check className="w-5 h-5" />
          Save
        </button>
      </div>
    </>
  )
}

function EducationContent() {

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Check className="w-6 h-6 text-green-500" />
          <h2 className="text-lg font-medium">Education</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500">
            <Eye className="w-5 h-5" />
          </button>
          <button className="text-gray-500">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-600">
          <span>Education</span>
          <span>{">"}</span>
          <span>New Education</span>
        </div>
      </div>

      <form className="space-y-6">
        <FormField label="Qualification" required>
          <div className="relative">
            <select className="w-full p-3 border rounded-md appearance-none bg-white pr-10">
              <option value="" disabled selected>
                Select Qualification
              </option>
              <option>Bachelor's Degree</option>
              <option>Master's Degree</option>
              <option>Doctorate</option>
              <option>Diploma</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </FormField>

        <FormField label="Course" required>
          <div className="relative">
            <select className="w-full p-3 border rounded-md appearance-none bg-white pr-10">
              <option value="" disabled selected>
                Select Course
              </option>
              <option>B.Tech</option>
              <option>BBA</option>
              <option>BSc</option>
              <option>BA</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </FormField>

        <FormField label="Specialization" required>
          <div className="relative">
            <select className="w-full p-3 border rounded-md appearance-none bg-white pr-10">
              <option value="" disabled selected>
                Select Specialization
              </option>
              <option>Computer Science</option>
              <option>Information Technology</option>
              <option>Electronics</option>
              <option>Mechanical</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </FormField>

        <FormField label="College" required>
          <input placeholder="College" className="w-full p-3 border rounded-md" />
        </FormField>

        <FormField label="Duration" required>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Start Year" className="w-full p-3 border rounded-md" />
            <input placeholder="End Year" className="w-full p-3 border rounded-md" />
          </div>
        </FormField>

        <FormField label="Course type">
          <div className="relative">
            <select className="w-full p-3 border rounded-md appearance-none bg-white pr-10">
              <option value="" disabled selected>
                Select Course Type
              </option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Distance</option>
              <option>Online</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Percentage">
            <input placeholder="Percentage" className="w-full p-3 border rounded-md" />
          </FormField>
          <FormField label="CGPA">
            <input placeholder="CGPA" className="w-full p-3 border rounded-md" />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Roll Number">
            <input placeholder="Roll number" className="w-full p-3 border rounded-md" />
          </FormField>
          <FormField label="Are you a Lateral Entry Student?">
            <div className="relative">
              <select className="w-full p-3 border rounded-md appearance-none bg-white pr-10">
                <option value="" disabled selected>
                  Lateral entry
                </option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </FormField>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button type="button" className="px-6 py-2 border border-gray-300 rounded-md flex items-center gap-2">
            Discard
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Save
          </button>
        </div>
      </form>
    </>
  )
}

