import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { ArrowLeft, MapPin, Building, GraduationCap, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useFetchAlumniProfile from "@/api/hooks/useFetchAlumniProfile";
import AlumniProfileLoading from "./components/loading"
import { sendConnectionReq } from "@/api/services/connectionService";
import { handleApiError } from "@/api/utils/apiUtils";
import { toast } from "sonner";
// This would typically come from an API or database


export default function AlumniProfilePage() {

  const {alumniId} = useParams()
  const {aluminus,loading,error} = useFetchAlumniProfile(alumniId)
  const [messageText, setMessageText] = useState("")
  const [connectBtn,setConnectBtn] = useState("CONNECT")

  useEffect(()=>{
    if (!loading && !error){
      setConnectBtn(aluminus!.connectionStatus!);
    }
    
  },[aluminus])
  const sendConnectionRequest = async (recieverId:string) => {
    if (connectBtn == "CONNECT"){
      setConnectBtn("PENDING");
      try{
        const res = await sendConnectionReq(recieverId);
      }catch(error : any){
        const errorMsg = handleApiError(error)
        toast.error(errorMsg.message)
        setConnectBtn("CONNECT")
      }
    }else{
      if (connectBtn == "PENDING") toast.error("you have already sent a request");
      if (connectBtn == "CONNECTED") toast.error("you are already connected");
    }
  }

  if (loading) {
    return <AlumniProfileLoading />
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Error: {error}</h1>
        <Link to="/alumni-search">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Alumni List
          </Button>
        </Link>
      </div>
    )
  }
    
  if (!aluminus) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Alumni not found</h1>
        <Link to="/alumni-search">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Alumni List
          </Button>
        </Link>
      </div>
    )
  }
  if (aluminus){
  
  const currentWork = Object.entries(aluminus.workExperience)[Object.entries(aluminus.workExperience).length-1][1]
  console.log(currentWork);
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link to="/alumni-search">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Alumni List
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-[#a52a2a]/20">
                  <img
                    src={aluminus?.user.profileImage}
                    alt={aluminus?.basic.firstName}
                    
                    className="object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold">{aluminus?.basic.firstName} {aluminus?.basic.lastName}</h2>
                <p className="text-lg text-muted-foreground">{currentWork.designation}</p>
                <div className="flex items-center mt-1 text-muted-foreground">
                  <Building className="h-4 w-4 mr-1" />
                  <span>{currentWork.organisation}</span>
                </div>
                <div className="flex items-center mt-1 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{currentWork.location}</span>
                </div>

                <div className="w-full border-t my-4"></div>

                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <span className="text-sm text-muted-foreground">Batch</span>
                    <span className="font-semibold">{aluminus.batch}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <span className="text-sm text-muted-foreground">Course</span>
                    <span className="font-semibold">{aluminus.basic.course}</span>
                  </div>
                </div>

                <div className="w-full border-t my-4"></div>

                {/* <div className="flex space-x-2 mt-2">
                  <Button variant="outline" size="icon" asChild>
                    <a href={`mailto:${alumni.email}`} aria-label="Email">
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={alumni.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={alumni.website} target="_blank" rel="noopener noreferrer" aria-label="Website">
                      <Globe className="h-4 w-4" />
                    </a>
                  </Button>
                </div> */}

                <Button onClick={()=>sendConnectionRequest(alumniId!)} className="w-full mt-4 bg-[#a52a2a] hover:bg-[#8b2323]">{connectBtn}</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="mb-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="message">Message</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{aluminus.about}</p>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {aluminus.skills?.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-slate-100 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 max-h-[400px] overflow-y-auto">
                    {aluminus.workExperience.map((exp) => (
                      <div key={exp.workId} className="border-l-2 border-[#a52a2a] pl-4 pb-2">
                        <h3 className="text-lg font-semibold">{exp.designation}</h3>
                        <div className="flex items-center text-muted-foreground">
                          <Building className="h-4 w-4 mr-1" />
                          <span>{exp.organisation}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p>{exp.description || ""}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 max-h-[400px] overflow-y-auto">
                    {aluminus.education && Object.entries(aluminus.education).map(([id,edu]) => (
                      <div key={id} className="border-l-2 border-[#a52a2a] pl-4 pb-2">
                        <h3 className="text-lg font-semibold">{edu.course} {edu.specialization}</h3>
                        <div className="flex items-center text-muted-foreground">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          <span>{edu.college}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{edu.duration.startYear} - {edu.duration.endYear}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="message">
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>Connect with {aluminus.basic.firstName} by sending a direct message</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <textarea
                      className="w-full p-3 border rounded-md min-h-[150px]"
                      placeholder={`Write a message to ${aluminus.basic.firstName}...`}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <Button className="w-full bg-[#a52a2a] hover:bg-[#8b2323]">Send Message</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )}
}

