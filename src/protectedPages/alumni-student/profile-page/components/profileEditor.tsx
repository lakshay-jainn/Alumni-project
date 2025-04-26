import { useState,useRef, useEffect } from "react";
import {
  ArrowLeft,
  Check,
  Clock,
  Eye,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./profileEditor.module.css"
import { updateProfileDetails } from "@/api/services/profileService";
import { useProfile } from "@/protectedPages/alumni-student/profile-page/ProfileContext";
import { handleApiError } from "@/api/utils/apiUtils";
import {v4 as uuidv4} from "uuid";
export default function ProfileEditor({
  setEditProfileModal,
  activeSelection,
}: {
  setEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>,
  activeSelection:
    | "basic"
    | "resume"
    | "about"
    | "skills"
    | "education"
    | "work"
    | "accomplishments"
    | "personal"
    | "social";
}) {
  const { profileDetails } = useProfile();
  const [activeSection, setActiveSection] = useState<
    | "basic"
    | "resume"
    | "about"
    | "skills"
    | "education"
    | "work"
    | "accomplishments"
    | "personal"
    | "social"
  >(activeSelection);

  // Function to render the appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "basic":
        return (
          <BasicDetailsContent  />
          
        );
      case "education":
        return <EducationContent  />;
      case "about":
        return <AboutContent />;
      case "skills":
        return <SkillsContent />;
      case "work":
        return <WorkExperienceContent />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            Content for {activeSection} section
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center h-16 px-4 border-b bg-white">
        <button onClick={()=>setEditProfileModal(false)} className="flex cursor-pointer items-center justify-center w-8 h-8 rounded-full bg-red-100 mr-2">
          <ArrowLeft className="w-4 h-4 text-[#95323d]" />
        </button>
        <h1 className="text-lg font-medium text-gray-700">Edit Profile</h1>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <div className="w-full md:w-[400px] border-r bg-white md:overflow-hidden md:h-screen md:sticky md:top-0">
          {/* Resume button */}
          {/* <div className="p-4">
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
          </div> */}

          {/* Progress */}
          <div className="px-4 py-5 bg-red-50 mx-4 rounded-md mb-4 mt-4 pb-8">
            <h2 className="text-lg font-medium text-gray-800">
              Complete your profile
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              And stand out !
            </p>
            <div className="relative ">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: profileDetails!.profileCompletionPercentage ? profileDetails!.profileCompletionPercentage : "0%" }}
                ></div>
              </div>
              <span className="absolute right-0 top-3 text-sm text-green-600 font-medium">
                {profileDetails?.profileCompletionPercentage}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <ul className="space-y-1">
              <NavItem
                icon={
                  activeSection === "basic" ? (
                    <div className="w-5 h-5 rounded-full border-2 border-[#95323d] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#95323d]"></div>
                      
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
              {/* <NavItem
                icon={<Clock className="w-5 h-5 text-gray-400" />}
                label="Resume"
                highlight={activeSection === "resume"}
                active={activeSection === "resume"}
                onClick={() => setActiveSection("resume")}
              /> */}
              <NavItem
                icon={
                  activeSection === "about" ? (
                    <div className="w-5 h-5 rounded-full border-2 border-[#95323d] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#95323d]"></div>
                      
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center"></div>
                  )
                }
                label="About"
                required
                highlight={activeSection === "about"}
                active={activeSection === "about"}
                onClick={() => setActiveSection("about")}
              />
              <NavItem
                icon={
                  activeSection === "skills" ? (
                    <div className="w-5 h-5 rounded-full border-2 border-[#95323d] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#95323d]"></div>
                      
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center"></div>
                  )
                }
                highlight={activeSection === "skills"}
                label="Skills"
                required
                active={activeSection === "skills"}
                onClick={() => setActiveSection("skills")}
              />
              <NavItem
                icon={
                  activeSection === "education" ? (
                    <div className="w-5 h-5 rounded-full border-2 border-[#95323d] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#95323d]"></div>
                      
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center"></div>
                  )
                }
                label="Education"
                required
                active={activeSection === "education"}
                highlight={activeSection === "education"}
                onClick={() => setActiveSection("education")}
              />
              <NavItem
                icon={
                  activeSection === "work" ? (
                    <div className="w-5 h-5 rounded-full border-2 border-[#95323d] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#95323d]"></div>
                      
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center"></div>
                  )
                }
                label="Work Experience"
                active={activeSection === "work"}
                highlight={activeSection === "work"}
                onClick={() => setActiveSection("work")}
              />
              {/* <NavItem
                icon={<Clock className="w-5 h-5 text-gray-400" />}
                label="Accomplishments & Initiatives"
                active={activeSection === "accomplishments"}
                highlight={activeSection === "accomplishments"}
                onClick={() => setActiveSection("accomplishments")}
              /> */}
              {/* <NavItem
                icon={<Clock className="w-5 h-5 text-gray-400" />}
                label="Personal Details"
                active={activeSection === "personal"}
                highlight={activeSection === "personal"}
                onClick={() => setActiveSection("personal")}
              /> */}
              {/* <NavItem
                icon={<Clock className="w-5 h-5 text-gray-400" />}
                label="Social Links"
                active={activeSection === "social"}
                highlight={activeSection === "social"}
                onClick={() => setActiveSection("social")}
              /> */}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 ">{renderContent()}</div>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  required = false,
  active = false,
  highlight = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  active?: boolean;
  highlight?: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-left ${
          active && highlight ? "border-r-4 border-[#95323d] bg-red-50" : ""
        } ${active ? "font-medium text-[#95323d]" : "text-gray-700"}`}
        onClick={onClick}
      >
        {icon}
        <span>{label}</span>
        {required && (
          <span className="ml-auto text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded">
            Required
          </span>
        )}
      </button>
    </li>
  );
}

function FormField({
  label,
  children,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <label className="text-gray-700">{label}</label>
        {required && <span className="text-red-500 ml-1">*</span>}
      </div>
      {children}
    </div>
  );
}
const basicDetailsSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().optional(),
  username: z.string().nonempty("Username is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().optional(),
  // gender: z.enum(["male", "female", "other"]),
  gender:z.string(),
  // userType: z.enum(["college", "professional", "school", "fresher"]),
  userType: z.string(),
  course: z.string().nonempty("Course is required"),
  courseSpecialization: z.string().nonempty("Course specialization is required"),
});

type BasicDetailsFormData = z.infer<typeof basicDetailsSchema>;
import {toast} from "sonner"
function BasicDetailsContent() {
  // For handling the profile image preview and dropzone
  const { profileDetails,setRefetch } = useProfile();
  const [imageUpdateOpen, setImgUpdateOpen] = useState(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(profileDetails!.profileImage || null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BasicDetailsFormData>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: {
      firstName: profileDetails!.basic.firstName || "",
      lastName: profileDetails!.basic.lastName || "",
      username: profileDetails!.username || "",
      email: profileDetails!.email || "",
      mobile: profileDetails!.basic.mobile || "",
      gender: profileDetails!.basic.gender || "",
      userType: profileDetails!.basic.userType || "",
      course: profileDetails!.basic.course || "",
      courseSpecialization: profileDetails!.basic.courseSpecialization || "",
    },
  });

  const onSubmit = async(data: BasicDetailsFormData) => {
    
    // Process form data here
    let newData : any = {};
    
    
    //@ts-ignore
    Object.entries(data).map(([key, value]) =>((value.length > 0 && (profileDetails.basic[key] != value && profileDetails[key] !=value)) && (newData[key] = value))); ;
    console.log(newData)
    if (Object.keys(newData).length > 0) {
      const toastId = toast.loading('Loading...');
      console.log(profileDetails?.basic)
      const { userType,firstName,lastName, ...profileWithoutUserType } = profileDetails!.basic;
      try{
        if (Object.keys(profileWithoutUserType).length === 0) {
          const profileCompletionPercentage = String(parseInt(profileDetails!.profileCompletionPercentage!.replace("%","")) + 20) + "%";
          await updateProfileDetails({basic:newData,profileCompletionPercentage});
        }else{
          await updateProfileDetails({basic:newData});
        }
        
        setRefetch((prev) => !prev);
        toast.success("Profile updated successfully!", {id: toastId});
      }catch(error){
        
        const errorResponse = handleApiError(error);
        console.error("Error:", errorResponse.errors);
        toast.error(errorResponse.message || "An error occurred", {id: toastId});
      }
  
    }

  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader();
    try {
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    } catch (error) {
      setPreview(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 1000000,
    accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border-2 border-[#95323d] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#95323d]"></div>
          </div>
          <h2 className="text-lg font-medium">Basic Details</h2>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="text-gray-500">
            <Eye className="w-5 h-5" />
          </button>
          <button type="button" className="text-gray-500">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <img
            src={preview ? (preview as string) : ""}
            width={120}
            height={120}
            alt="Profile Preview"
            className="rounded-full bg-gray-200 object-cover object-center aspect-square"
          />
          <button
            type="button"
            onClick={() => setImgUpdateOpen(true)}
            className="absolute bottom-0 right-0 w-8 h-8 bg-[#95323d] rounded-full flex items-center justify-center border-2 border-white"
          >
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

      {/* Image Upload Section */}
      {imageUpdateOpen && (
        <div className="flex justify-center mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-4">Update Profile Picture</h2>
            <div
              {...getRootProps()}
              className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg p-8 border"
            >
              {preview ? (
                <img
                  src={preview as string}
                  alt="Uploaded image"
                  className="max-h-[300px] rounded-lg"
                />
              ) : (
                <ImagePlus className="size-40 text-red-200" />
              )}
              <input {...getInputProps()} type="file" />
              {isDragActive ? (
                <p>Drop the image!</p>
              ) : (
                <p>Click here or drag an image to upload it</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <div className={`${imageUpdateOpen ? "hidden" : ""} grid grid-cols-1 md:grid-cols-2 gap-6`}>
        {/* First Name */}
        <div>
          <label className="block text-sm mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-md"
            {...register("firstName")}
          />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm mb-1">Last Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md"
            {...register("lastName")}
          />
          {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm mb-1">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-md disabled-field "
            {...register("username")}
            readOnly
          />
          {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              className="w-full p-3 border rounded-md pr-12 disabled-field"
              readOnly
              {...register("email")}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#95323d] text-sm font-medium">
              <button type="button" className="flex items-center cursor-pointer">
                Update Email
              </button>
            </div>
            <div className="absolute right-0 top-0 -mt-1 -mr-1">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        {/* Mobile */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm mb-1">
            Mobile <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <div className="relative">
              <button type="button" className="flex items-center gap-1 p-3 border rounded-l-md bg-gray-50 w-20">
                <span>+91</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full p-3 border border-l-0 rounded-r-md"
                {...register("mobile")}
              />
              <div className="absolute right-0 top-0 -mt-1 -mr-1">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
          {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile.message}</p>}
        </div>

        {/* Gender */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 border rounded-full ${
                watch("gender") === "male"
                  ? "border-[#95323d] text-[#95323d]"
                  : "border-gray-300 text-gray-600"
              }`}
              onClick={() => setValue("gender", "male")}
            >
              <span className="text-lg">♂</span>
              <span>Male</span>
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 border rounded-full ${
                watch("gender") === "female"
                  ? "border-[#95323d] text-[#95323d]"
                  : "border-gray-300 text-gray-600"
              }`}
              onClick={() => setValue("gender", "female")}
            >
              <span className="text-lg">♀</span>
              <span>Female</span>
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 border rounded-full ${
                watch("gender") === "other"
                  ? "border-[#95323d] text-[#95323d]"
                  : "border-gray-300 text-gray-600"
              }`}
              onClick={() => setValue("gender", "other")}
            >
              <span className="text-lg">👤</span>
              <span>Other</span>
            </button>
          </div>
          {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
        </div>

        {/* User Type */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm mb-1">
            User Type <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 border rounded-full ${
                watch("userType") === "STUDENT"
                  ? "border-[#95323d] text-[#95323d]"
                  : "border-gray-300 text-gray-600"
              }`}
              disabled
              onClick={() => setValue("userType", "STUDENT")}
            >
              <span className="text-lg">🎓</span>
              <span>College Student</span>
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 border rounded-full ${
                watch("userType") === "ALUMNI"
                  ? "border-[#95323d] text-[#95323d]"
                  : "border-gray-300 text-gray-600"
              }`}
              disabled
              onClick={() => setValue("userType", "ALUMNI")}
            >
              <span className="text-lg">👔</span>
              <span>Alumni</span>
            </button>
            
          </div>
          {errors.userType && <p className="text-red-500 text-xs">{errors.userType.message}</p>}
        </div>

        {/* Course */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm mb-1">
            Course <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full p-3 border rounded-md appearance-none bg-white pr-10"
              {...register("course")}
            >
              <option value="cs h">cs h</option>
              <option value="BS (Bachelor of Science)">BS (Bachelor of Science)</option>
              <option value="BA (Bachelor of Arts)">BA (Bachelor of Arts)</option>
              <option value="BBA (Bachelor of Business Administration)">
                BBA (Bachelor of Business Administration)
              </option>
              <option value="B.Tech (Bachelor of Technology)">B.Tech (Bachelor of Technology)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
          {errors.course && <p className="text-red-500 text-xs">{errors.course.message}</p>}
        </div>

        {/* Course Specialization */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm mb-1">
            Course Specialization <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full p-3 border rounded-md appearance-none bg-white pr-10"
              {...register("courseSpecialization")}
            >
              <option value="Others">Others</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
          {errors.courseSpecialization && (
            <p className="text-red-500 text-xs">{errors.courseSpecialization.message}</p>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button type="submit" className="px-6 py-2 bg-[#95323d] text-white rounded-full flex items-center gap-2">
          <Check className="w-5 h-5" />
          Save
        </button>
      </div>
    </form>
  );
}
const AboutSchema = z.object({
  about: z.string().min(30, {
    message: "30 characters minimum",
  }).max(1000, {
    message: "1000 characters maximum",
  })
  
});

type AboutFormData = z.infer<typeof AboutSchema>;

function AboutContent(){
  const { profileDetails ,setRefetch} = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AboutFormData>({
    resolver: zodResolver(AboutSchema),
    defaultValues: {
      about: profileDetails?.about || "",
    },
  });
  const onSubmit = async(data: AboutFormData) => {
    if (data.about.length > 0 && profileDetails?.about != data.about) {
      const toastId = toast.loading('Loading...');
      try{
        if (!profileDetails?.about){
          const profileCompletionPercentage = String(parseInt(profileDetails!.profileCompletionPercentage!.replace("%","")) + 20) + "%";
          await updateProfileDetails({about:data.about,profileCompletionPercentage});
        }else{
          await updateProfileDetails({about:data.about});
        }
        
        setRefetch((prev) => !prev);
        toast.success("Profile updated successfully!", {id: toastId});
      }catch(error){
        
        const errorResponse = handleApiError(error);
        console.error("Error:", errorResponse.message);
        toast.error(errorResponse.message || "An error occurred", {id: toastId});
      }
  
    }
    // Process form data here
    

  };

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full border-2 border-[#95323d] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#95323d]"></div>
          </div>
          <h2 className="text-lg font-medium">About</h2>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="text-gray-500">
            <Eye className="w-5 h-5" />
          </button>
          <button type="button" className="text-gray-500">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <FormField label="About yourself" required>
        <textarea
          {...register("about")}
          placeholder="Write about yourself"
          minLength={30}
          maxLength={1000}
          className={`text-[14px] w-full h-[15rem] p-3 border rounded-md ${errors.about ? "border-red-500" : ""}`}
        ></textarea>
        {errors.about && <p className="text-red-500 text-xs">{errors.about.message}</p>}
      </FormField>

      <div className="mt-8 flex justify-end">
        <button type="submit" className="px-6 py-2 bg-[#95323d] hover:bg-[#7c2a32] text-white rounded-full flex items-center gap-2">
          <Check className="w-5 h-5" />
          Save
        </button>
      </div>
    </form>
  )
}
import { isEqual } from "lodash";
function SkillsContent(){
  const { profileDetails,setRefetch } = useProfile();
  const inputRef = useRef<HTMLInputElement>(null);
  const [skills, setSkills] = useState<string[]>(profileDetails?.skills || []);
  const onSubmit = async() => {
    if (skills.length > 0 && profileDetails?.skills?.toString() != skills.toString()) {
      const toastId = toast.loading('Loading...');
      try{
        if (profileDetails?.skills?.length === 0) {
          const profileCompletionPercentage = String(parseInt(profileDetails!.profileCompletionPercentage!.replace("%","")) + 20) + "%";
          await updateProfileDetails({skills:skills,profileCompletionPercentage});
        }else{
          await updateProfileDetails({skills:skills});
        }
        
        setRefetch((prev) => !prev);
        toast.success("Profile updated successfully!", {id: toastId});
      }catch(error){
        
        const errorResponse = handleApiError(error);
        console.error("Error:", errorResponse.errors);
        toast.error(errorResponse.message,{id: toastId})
      }
  
    }

    // Process form data here
  };

  const addSkill = () => {
    let skill = inputRef.current?.value.trim();
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return(
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border-2 border-[#95323d] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#95323d]"></div>
            </div>
          <h2 className="text-lg font-medium">Skills</h2>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="text-gray-500">
            <Eye className="w-5 h-5" />
          </button>
          <button type="button" className="text-gray-500">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.length > 0 && skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <span className="bg-red-100 text-[#95323d] px-3 py-1 rounded-full text-sm">{skill}</span>
          </div>
          ))}
      </div>
      <div className="flex gap-5">

        <input
            ref={inputRef}
            placeholder="Type your skills here"
            className={`text-[14px] w-full p-3 border rounded-md`}
        />
        <button onClick={()=>addSkill()} className="min-w-max px-6 py-2 bg-[#95323d] hover:bg-[#7c2a32] text-white rounded-md flex items-center gap-2">
          Add Skills
        </button>
      </div>
      <div className="mt-8 flex justify-end">
        <button onClick={()=>onSubmit()} type="submit" className="px-6 py-2 bg-[#95323d] hover:bg-[#7c2a32] text-white rounded-full flex items-center gap-2">
          <Check className="w-5 h-5" />
          Save
        </button>
      </div>
    </div>
  )
}
import { GraduationCap } from "lucide-react";
const EducationSchema = z.object({
  id: z.string(),
  qualification: z.string().nonempty("Qualification is required"),
  course: z.string().nonempty("Course is required"),
  specialization: z.string().nonempty("Specialization is required"),
  college: z.string().nonempty("College is required"),
  startYear: z.string().nonempty("Start Year is required"),
  endYear: z.string().nonempty("End Year is required"),
  courseType: z.string(),
  percentage: z.string(),
  cgpa: z.string(),
  rollNumber: z.string(),
});
export type EducationFormData = z.infer<typeof EducationSchema>;

/* ------------------------- EducationContent Component ------------------------- */
function EducationContent() {
  const { profileDetails } = useProfile();
  const [showEditEducation, setShowEditEducation] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<any | null>(null);
  const [openDiscardProgress, setOpenDiscardProgress] = useState(false);

  useEffect(() => {
    if (!profileDetails?.education) {
      setShowEditEducation(true);
    }
  }, [profileDetails]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full border-2 border-[#95323d] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#95323d]"></div>
          </div>
          <h2 className="text-lg font-medium">Education</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => (setCurrentEducation(null), setShowEditEducation(true))}
            className="text-gray-500"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button type="button" className="text-gray-500">
            <Eye className="w-5 h-5" />
          </button>
          <button type="button" className="text-gray-500">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-600">
          <DiscardProgressModal
            open={openDiscardProgress}
            setOpen={setOpenDiscardProgress}
            setEditForm={setShowEditEducation}
          />
          <span className="hover:text-[#95323d] cursor-pointer" onClick={() => setOpenDiscardProgress(true)}>
            Education
          </span>
          {showEditEducation && (
            <>
              <span>{">"}</span>
              <span>{currentEducation? "Edit" : "New"} Education</span>
            </>
          )}
        </div>
      </div>
      {!showEditEducation ? (
        profileDetails?.education ? Object.entries(profileDetails?.education).map(([id,data]) => (
          <div key={id} className="p-4 border rounded-md shadow-sm flex gap-5">
            <div>
              <Avatar className="rounded-md font-bold text-[#95323d] border-1">
                <AvatarFallback className="rounded-none bg-white">
                  {data.college.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex w-full items-center gap-1 justify-between">
                <h3 className="text-lg font-medium">{data.qualification}</h3>
                <div className="relative cursor-pointer">
                  <input id="dotcheckbox" type="checkbox" className="absolute inset-0 peer opacity-0" />
                  <EllipsisVertical className="peer-checked:hidden" />
                  <X className="hidden peer-checked:block peer-checked:border-1 peer-checked:rounded-full peer-checked:bg-red-100 peer-checked:text-[#95323d]" />
                  <div
                    id="editbox"
                    className="peer-checked:flex-col text-start px-2 py-2 border-8 w-[160px] hidden peer-checked:absolute peer-checked:-translate-x-[90%] peer-checked:top-8 peer-checked:left-0 peer-checked:bg-white peer-checked:border peer-checked:border-gray-300 peer-checked:rounded-md peer-checked:flex peer-checked:items-center peer-checked:justify-center"
                  >
                    <button
                      onClick={() => (setShowEditEducation(true), setCurrentEducation({id:id,...data}))}
                      className="flex justify-start w-full gap-3 items-center hover:cursor-pointer hover:bg-gray-100 hover:rounded-lg px-1 py-[5px]"
                    >
                      <Pencil className="w-4" /> Edit
                    </button>
                    <button className="flex justify-start w-full gap-3 items-center hover:cursor-pointer hover:bg-gray-100 hover:rounded-lg px-1 py-[5px]">
                      <Trash2 className="w-4 text-red-500" /> Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex align-center gap-1"><GraduationCap className="w-5" /><p className="text-gray-600 ml-2">{data.course} {data.specialization}</p></div>
              <div className="flex align-center gap-1"><Building className="w-5" /><p className="text-gray-600 ml-2">{data.college}</p></div>
              <div className="flex align-center gap-1"><Calendar className="w-5"  /><p className="text-gray-500 ml-2">{data.duration.startYear} - {data.duration.endYear}</p></div>
            </div>
          </div>
        )) : (
          <div className="flex items-center justify-center text-gray-500 h-32">
            <p>No education added yet.</p>
          </div>
        )
      ) : (
        <EducationForm currentEducation={currentEducation} />
      )}
    </div>
  );
}

/* ------------------------- EducationForm Component ------------------------- */
function EducationForm({ currentEducation }: { currentEducation: any | null }) {
  const { profileDetails, setRefetch } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      qualification: currentEducation?.qualification || "",
      course: currentEducation?.course || "",
      specialization: currentEducation?.specialization || "",
      college: currentEducation?.college || "",
      startYear: currentEducation?.duration.startYear || "",
      endYear: currentEducation?.duration.endYear || "",
      courseType: currentEducation?.courseType || "",
      percentage: currentEducation?.percentage || "",
      cgpa: currentEducation?.cgpa || "",
      rollNumber: currentEducation?.rollNumber || "",
      id: currentEducation?.id || uuidv4(),
    },
  });

  const onSubmit = async (data: EducationFormData) => {
    const { startYear, endYear, ...rest } = data;
    const newData = { ...rest, duration: { startYear, endYear } };
    const { id, ...newDataWithoutId } = newData;
    const formatedData ={
        [data.id]: newDataWithoutId
    }
    const toastId = toast.loading("Loading...");
    try {
      if (!profileDetails?.education) {
        const profileCompletionPercentage =
          String(parseInt(profileDetails!.profileCompletionPercentage!.replace("%", "")) + 20) + "%";
        await updateProfileDetails({ education: formatedData, profileCompletionPercentage });
      } else {
        await updateProfileDetails({ education: formatedData });
      }
      setRefetch((prev) => !prev);
      toast.success("Profile updated successfully!", { id: toastId });
    } catch (error) {
      const errorResponse = handleApiError(error);
      console.error("Error:", errorResponse.errors);
      toast.error(errorResponse.message, { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Qualification */}
      <FormField label="Qualification" required>
        <div className="relative">
          <select
            className="w-full p-3 border rounded-md appearance-none bg-white pr-10"
            {...register("qualification")}
          >
            <option value="" disabled>
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
        {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification.message}</p>}
      </FormField>

      {/* Course */}
      <FormField label="Course" required>
        <div className="relative">
          <select
            className="w-full p-3 border rounded-md appearance-none bg-white pr-10"
            {...register("course")}
          >
            <option value="" disabled>
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
        {errors.course && <p className="text-red-500 text-sm">{errors.course.message}</p>}
      </FormField>

      {/* Specialization */}
      <FormField label="Specialization" required>
        <div className="relative">
          <select
            className="w-full p-3 border rounded-md appearance-none bg-white pr-10"
            {...register("specialization")}
          >
            <option value="" disabled>
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
        {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization.message}</p>}
      </FormField>

      {/* College */}
      <FormField label="College" required>
        <input
          placeholder="College"
          className="w-full p-3 border rounded-md"
          {...register("college")}
        />
        {errors.college && <p className="text-red-500 text-sm">{errors.college.message}</p>}
      </FormField>

      {/* Duration */}
      <FormField label="Duration" required>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="month"
            placeholder="Start Year"
            className="w-full p-3 border rounded-md"
            {...register("startYear")}
          />
          <input
            type="month"
            placeholder="End Year"
            className="w-full p-3 border rounded-md"
            {...register("endYear")}
          />
        </div>
        {(errors.startYear || errors.endYear) && (
          <p className="text-red-500 text-sm">Start and End Year are required</p>
        )}
      </FormField>

      {/* Course Type */}
      <FormField label="Course type">
        <div className="relative">
          <select
            className="w-full p-3 border rounded-md appearance-none bg-white pr-10"
            {...register("courseType")}
          >
            <option value="" disabled>
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

      {/* Percentage & CGPA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Percentage">
          <input
            placeholder="Percentage"
            className="w-full p-3 border rounded-md"
            {...register("percentage")}
          />
        </FormField>
        <FormField label="CGPA">
          <input
            placeholder="CGPA"
            className="w-full p-3 border rounded-md"
            {...register("cgpa")}
          />
        </FormField>
      </div>

      {/* Roll Number */}
      <FormField label="Roll Number">
        <input
          placeholder="Roll number"
          className="w-full p-3 border rounded-md"
          {...register("rollNumber")}
        />
      </FormField>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md flex items-center gap-2"
        >
          Discard
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-[#95323d] hover:bg-[#7c2a32] text-white rounded-md flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          Save
        </button>
      </div>
    </form>
  );
}

export const jobFormSchema = z.object({
  id: z.string(),
  designation: z.string().min(1, "Designation is required"),
  organisation: z.string().min(1, "Organisation is required"),
  employmentType: z
    .string()
    .min(1, "Employment type is required")
    .optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  currentlyWorking: z.boolean().optional(),
  location: z.string().optional(),
  remote: z.boolean().optional(),
  skills: z
    .array(z.string())
    .optional(), // Or you can store them as a single string and split later
  description: z.string().optional(),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
import { Avatar,AvatarFallback } from "@/components/ui/avatar";
import { Calendar,Building,MapPin,Pencil,EllipsisVertical,X,Trash2,Plus } from "lucide-react";
function WorkExperienceContent(){
  const { profileDetails } = useProfile();
  const [showEditExperience, setShowEditExperience] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<any | null>(null);

  const [openDiscardProgress, setOpenDiscardProgress] = useState(false);
  useEffect(() => {
    if (!profileDetails?.workExperience || profileDetails?.workExperience?.length===0) {
      setShowEditExperience(true);
    }
  }
, []);
  return(
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border-2 border-[#95323d] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#95323d]"></div>
          </div>
          <h2 className="text-lg font-medium">Work Experience</h2>
        </div>
        <div className="flex items-center gap-2">
        <button type="button" onClick={()=>(setCurrentExperience(null),setShowEditExperience(true))} className="text-gray-500">
            <Plus className="w-5 h-5" />
          </button>
          <button type="button" className="text-gray-500">
            <Eye className="w-5 h-5" />
          </button>
          <button type="button" className="text-gray-500">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-600">
          <DiscardProgressModal open={openDiscardProgress} setOpen={setOpenDiscardProgress} setEditForm={setShowEditExperience} />
          <span className="hover:text-[#95323d] cursor-pointer" onClick={()=>setOpenDiscardProgress(true)}>Work Experience</span>
          {
            showEditExperience && (
                <>
                  <span>{">"}</span>
                  <span>{currentExperience? "Edit" : "New"} Work Experience</span>
                </>
            )
          }
        </div>
      </div>
      {!showEditExperience && (
        <div className="grid grid-cols-1 gap-6">
        {profileDetails?.workExperience && profileDetails?.workExperience.length>0 ? profileDetails?.workExperience.map((data) => (
          <div key={data.workId} className="p-4 border rounded-md shadow-sm flex gap-5">
            <div className="">
              <Avatar className="rounded-md font-bold text-[#95323d] border-1">
              <AvatarFallback className="rounded-none bg-white" >{data.organisation.slice(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex w-full align-center gap-1 justify-between">
                 <h3 className="text-lg font-medium">{data.designation}</h3>
                 <div className="relative cursor-pointer">
                 <input id="dotcheckbox" type="checkbox" className="absolute inset-0 peer opacity-0 " />
                 <EllipsisVertical className="peer-checked:hidden" />
                 <X className="hidden peer-checked:block peer-checked:border-1 peer-checked:rounded-full peer-checked:bg-red-100 peer-checked:text-[#95323d]" />
                  <div id="editbox" className="peer-checked:flex-col text-start px-2 py-2 border-8 w-[160px] hidden peer-checked:absolute peer-checked:-translate-x-[90%] peer-checked:top-8 peer-checked:left-0 peer-checked:bg-white peer-checked:border peer-checked:border-gray-300 peer-checked:rounded-md peer-checked:flex peer-checked:items-center peer-checked:justify-center">
                    <button onClick={()=>(setShowEditExperience(true),setCurrentExperience({id:data.workId,...data}))} className="flex justify-start w-full gap-3 items-center hover:cursor-pointer hover:bg-gray-100 hover:rounded-lg px-1 py-[5px]">
                    <Pencil className="w-4" /> Edit 
                    </button>
                    <button className="flex justify-start w-full gap-3 items-center hover:cursor-pointer hover:bg-gray-100 hover:rounded-lg px-1 py-[5px]">
                    <Trash2 className="w-4 text-red-500" /> Delete 
                    </button>
                  </div>
                 </div>


                </div>
              <div className="flex align-center gap-1"><Building className="w-5" /><p className="text-gray-600 ml-2">{data.organisation}</p></div>
              <div className="flex align-center gap-1"><Calendar className="w-5"  /><p className="text-gray-500 ml-2">{data.startDate} - {data.endDate}</p></div>
              <div className="flex align-center gap-1"><MapPin className="w-5"  /><p className="text-gray-500 ml-2">{data.location}</p></div>
            </div>
          </div>
        )) : (
          <div className="flex items-center justify-center text-gray-500 h-32">
            <p>No work experience added yet.</p>
          </div>
        )}
      </div>
      )}
      {showEditExperience && (
         <WorkExperienceForm currentExperience={currentExperience} />
      )}
    </div>
  )

  
}
import {Dialog,DialogContent} from "@/components/ui/dialog";

function DiscardProgressModal({open,setOpen,setEditForm}:{open:any,setOpen:any,setEditForm:any}){
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="p-5 text-center ">
           <h1 className="font-bold text-xl mb-5">are you sure you want to discard changes?</h1>
           <div className="flex gap-2">
            <button className="p-2 bg-green-500 text-white rounded-xl flex-1 cursor-pointer" onClick={()=>(setEditForm(false),setOpen(false))}>confirm</button>
            <button className="p-2 bg-red-500 text-white rounded-xl flex-1 cursor-pointer" onClick={()=>(setOpen(false))}>cancel</button>
          </div>
        </div>
        
      </DialogContent>
    </Dialog>
  )
}
function WorkExperienceForm({currentExperience}:{currentExperience:(JobFormValues | null )}) {
  const { profileDetails,setRefetch } = useProfile();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      designation: currentExperience?.designation || "",
      organisation: currentExperience?.organisation || "",
      employmentType: currentExperience?.employmentType || "",
      startDate: currentExperience?.startDate || "",
      endDate: currentExperience?.endDate || "",
      currentlyWorking: currentExperience?.currentlyWorking || true,
      location: currentExperience?.location || "",
      remote: currentExperience?.remote || false,
      skills: currentExperience?.skills || [],
      description: currentExperience?.description || "",
      // attachments: null
    },
  });
  const onSubmit = async(formData: JobFormValues) => {
    // Handle form data here
    console.log(formData);
    let id;
    

    if (!currentExperience) {
      id = uuidv4(); // Generate a new ID if not provided
    }
    else{
      id = currentExperience.id;
      const formDataWithId={...formData,id};
      if (isEqual(formDataWithId, currentExperience)) {
        toast.error("No changes made to the form!");
        return;
      }
    }


    const newData={
      workExperience:{
        [id]:formData
      }
    }
    const toastId = toast.loading('Loading...');
    try{
      if (!profileDetails?.workExperience || profileDetails?.workExperience.length === 0) {
          const profileCompletionPercentage = String(parseInt(profileDetails!.profileCompletionPercentage!.replace("%","")) + 20) + "%";
          await updateProfileDetails({...newData,profileCompletionPercentage});
          toast.success("Profile updated successfully!", {id: toastId});
      }
      else{
  
        await updateProfileDetails({ ...newData });
        toast.success("Profile updated successfully!", {id: toastId});
      }
      setRefetch((prev) => !prev);
    }catch(e){
      const errorResponse = handleApiError(e);
      console.error("Error:", errorResponse.errors);
      toast.error(errorResponse.message ,{id: toastId})
    }

    

  };
  useEffect(() => {
    return () => {
      console.log('unmounting WorkExperienceForm');
    }
  },[])
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input
             type="text"
             placeholder="id"
             value={currentExperience?.id ? currentExperience.id : ""}
             className="hidden"
             {...register("id")}
           />
         {/* Designation */}
         <FormField label="Designation" required>
           <div className="relative">
             <select
               className="w-full p-3 border rounded-md appearance-none bg-white pr-10"
               {...register("designation")}
             >
               <option value="" disabled>
                 Select Designation
               </option>
               <option value="Software Engineer">Software Engineer</option>
               <option value="Project Manager">Project Manager</option>
               <option value="Business Analyst">Business Analyst</option>
               {/* Add more designations as needed */}
             </select>
             <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
               <ChevronDown className="w-5 h-5 text-gray-500" />
             </div>
           </div>
           {errors.designation && (
             <p className="text-red-500 text-sm mt-1">
               {errors.designation.message}
             </p>
           )}
         </FormField>
   
         {/* Organisation */}
         <FormField label="Organisation" required>
           <input
             type="text"
             placeholder="Organisation"
             className="w-full p-3 border rounded-md"
             {...register("organisation")}
           />
           {errors.organisation && (
             <p className="text-red-500 text-sm mt-1">
               {errors.organisation.message}
             </p>
           )}
         </FormField>
   
         {/* Employment Type */}
         <FormField label="Employment Type" required>
           <div className="relative">
             <select
               className="w-full p-3 border rounded-md appearance-none bg-white pr-10"
               {...register("employmentType")}
             >
               <option value="" disabled>
                 Select Employment Type
               </option>
               <option value="Full-time">Full-time</option>
               <option value="Part-time">Part-time</option>
               <option value="Contract">Contract</option>
               <option value="Freelance">Freelance</option>
             </select>
             <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
               <ChevronDown className="w-5 h-5 text-gray-500" />
             </div>
           </div>
           {errors.employmentType && (
             <p className="text-red-500 text-sm mt-1">
               {errors.employmentType.message}
             </p>
           )}
         </FormField>
   
         {/* Duration */}
         <FormField label="Duration" required>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input
               type="date"
               placeholder="Start Date"
               className="w-full p-3 border rounded-md"
               {...register("startDate")}
             />
             <input
               type="date"
               placeholder="End Date"
               className="w-full p-3 border rounded-md"
               {...register("endDate")}
             />
           </div>
           <div className="mt-2 flex items-center gap-2">
             <input
               type="checkbox"
               {...register("currentlyWorking")}
               id="currentlyWorking"
             />
             <label htmlFor="currentlyWorking">
               Currently working in this role
             </label>
           </div>
           {errors.startDate && (
             <p className="text-red-500 text-sm mt-1">
               {errors.startDate.message}
             </p>
           )}
         </FormField>
   
         {/* Location + Remote */}
         <FormField label="Location">
           <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
             <input
               type="text"
               placeholder="Location"
               className="w-full p-3 border rounded-md"
               {...register("location")}
             />
             <div className="flex items-center gap-2">
               <input
                 type="checkbox"
                 {...register("remote")}
                 id="remote"
               />
               <label htmlFor="remote">Remote</label>
             </div>
           </div>
         </FormField>
   
         {/* Skills */}
         <FormField label="Skills">
           <input
             type="text"
             placeholder="Add a skill (comma-separated or one at a time)"
             className="w-full p-3 border rounded-md"
             onChange={(e) => {
               const splitSkills = e.target.value
                 .split(",")
                 .map((skill) => skill.trim());
              setValue("skills", splitSkills);
             }}
           />
         </FormField>
   
         {/* Description */}
         <FormField label="Description">
           <textarea
             placeholder="Describe your role here..."
             className="w-full p-3 border rounded-md"
             rows={4}
             {...register("description")}
           />
         </FormField>
   
         

   
         {/* Attachments (non-submit) */}
         <div>
           <button
             type="button"
             className="px-6 py-2 border border-gray-300 rounded-md flex items-center gap-2 mt-2"
           >
             Attachments
           </button>
           {/* 
             If you want to actually handle file uploads:
             <input
               type="file"
               {...register("attachments")}
               multiple
               className="mt-2"
             />
           */}
         </div>
   
         {/* Action Buttons */}
         <div className="flex justify-end gap-4 pt-4">
           <button
             type="button"
             className="px-6 py-2 border border-gray-300 rounded-md flex items-center gap-2"
           >
             Discard
           </button>
           <button
             type="submit"
             className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md flex items-center gap-2"
           >
             <Check className="w-4 h-4" />
             Save
           </button>
         </div>
       </form>
  )
}