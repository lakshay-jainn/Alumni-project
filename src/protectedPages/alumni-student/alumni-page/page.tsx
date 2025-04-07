import { useParams } from "react-router-dom";
import { useState } from "react"
import {Link} from "react-router-dom"
import { ArrowLeft, Mail, Linkedin, Twitter, Globe, MapPin, Building, GraduationCap, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would typically come from an API or database
const getAlumniData = (id: string) => {
  const alumni = {
    "980fa6b0-9118-4cb9-8603-77295afefbf3": {
      id: "980fa6b0-9118-4cb9-8603-77295afefbf3",
      name: "Rish Kumar",
      jobTitle: "Software Engineer",
      company: "Google",
      course: "abc course",
      batch: "2024",
      email: "rish.kumar@example.com",
      linkedin: "https://linkedin.com/in/rishkumar",
      twitter: "https://twitter.com/rishkumar",
      website: "https://rishkumar.dev",
      location: "San Francisco, CA",
      bio: "Passionate software engineer with expertise in web development and machine learning. Currently working on search algorithms at Google.",
      experience: [
        {
          title: "Software Engineer",
          company: "Google",
          duration: "2024 - Present",
          description: "Working on search algorithms and web infrastructure.",
        },
        {
          title: "Software Engineering Intern",
          company: "Microsoft",
          duration: "2023",
          description: "Developed features for Microsoft Teams.",
        },
      ],
      education: [
        {
          degree: "abc course",
          institution: "University Name",
          year: "2024",
        },
        {
          degree: "High School",
          institution: "School Name",
          year: "2020",
        },
      ],
      skills: ["JavaScript", "React", "Node.js", "Python", "Machine Learning", "Cloud Computing"],
    },
    "2": {
      id: "2",
      name: "Jaini",
      jobTitle: "FIELD-WORKER",
      company: "CHAPRA UNIVERSITY",
      course: "BSC-H-CS",
      batch: "2024",
      email: "jaini@example.com",
      linkedin: "https://linkedin.com/in/jaini",
      twitter: "https://twitter.com/jaini",
      website: "https://jaini.dev",
      location: "Chapra, India",
      bio: "Field worker at Chapra University with a background in computer science. Passionate about education and community outreach.",
      experience: [
        {
          title: "FIELD-WORKER",
          company: "CHAPRA UNIVERSITY",
          duration: "2024 - Present",
          description: "Conducting field research and community outreach programs.",
        },
        {
          title: "Research Assistant",
          company: "Research Institute",
          duration: "2023",
          description: "Assisted in data collection and analysis for research projects.",
        },
      ],
      education: [
        {
          degree: "BSC-H-CS",
          institution: "Chapra University",
          year: "2024",
        },
        {
          degree: "High School",
          institution: "School Name",
          year: "2020",
        },
      ],
      skills: ["Research", "Data Analysis", "Community Outreach", "Computer Science", "Field Work"],
    },
    "3": {
      id: "3",
      name: "Someone2",
      jobTitle: "Software Developer",
      company: "Microsoft",
      course: "abcd course",
      batch: "2023",
      email: "someone2@example.com",
      linkedin: "https://linkedin.com/in/someone2",
      twitter: "https://twitter.com/someone2",
      website: "https://someone2.dev",
      location: "Seattle, WA",
      bio: "Software developer at Microsoft with a focus on cloud technologies. Graduated in 2023 with a degree in Computer Science.",
      experience: [
        {
          title: "Software Developer",
          company: "Microsoft",
          duration: "2023 - Present",
          description: "Working on Azure cloud services and infrastructure.",
        },
        {
          title: "Intern",
          company: "Amazon",
          duration: "2022",
          description: "Developed backend services for Amazon Web Services.",
        },
      ],
      education: [
        {
          degree: "abcd course",
          institution: "University Name",
          year: "2023",
        },
        {
          degree: "High School",
          institution: "School Name",
          year: "2019",
        },
      ],
      skills: ["C#", ".NET", "Azure", "Cloud Computing", "Microservices", "Docker"],
    },
  }

  return alumni[id as keyof typeof alumni]
}

export default function AlumniProfilePage() {
  const params = useParams()
  const alumniId = params.id as string
  const alumni = getAlumniData(alumniId)
  const [messageText, setMessageText] = useState("")

  if (!alumni) {
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
                    src={`/placeholder.svg?height=128&width=128`}
                    alt={alumni.name}
                    
                    className="object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold">{alumni.name}</h2>
                <p className="text-lg text-muted-foreground">{alumni.jobTitle}</p>
                <div className="flex items-center mt-1 text-muted-foreground">
                  <Building className="h-4 w-4 mr-1" />
                  <span>{alumni.company}</span>
                </div>
                <div className="flex items-center mt-1 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{alumni.location}</span>
                </div>

                <div className="w-full border-t my-4"></div>

                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <span className="text-sm text-muted-foreground">Batch</span>
                    <span className="font-semibold">{alumni.batch}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <span className="text-sm text-muted-foreground">Course</span>
                    <span className="font-semibold">{alumni.course}</span>
                  </div>
                </div>

                <div className="w-full border-t my-4"></div>

                <div className="flex space-x-2 mt-2">
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
                </div>

                <Button className="w-full mt-4 bg-[#a52a2a] hover:bg-[#8b2323]">Connect</Button>
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
                  <p className="text-muted-foreground">{alumni.bio}</p>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {alumni.skills.map((skill, index) => (
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
                  <div className="space-y-6">
                    {alumni.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-[#a52a2a] pl-4 pb-2">
                        <h3 className="text-lg font-semibold">{exp.title}</h3>
                        <div className="flex items-center text-muted-foreground">
                          <Building className="h-4 w-4 mr-1" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{exp.duration}</span>
                        </div>
                        <p>{exp.description}</p>
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
                  <div className="space-y-6">
                    {alumni.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-[#a52a2a] pl-4 pb-2">
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <div className="flex items-center text-muted-foreground">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          <span>{edu.institution}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{edu.year}</span>
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
                  <CardDescription>Connect with {alumni.name} by sending a direct message</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <textarea
                      className="w-full p-3 border rounded-md min-h-[150px]"
                      placeholder={`Write a message to ${alumni.name}...`}
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
  )
}

