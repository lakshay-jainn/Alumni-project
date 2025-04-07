import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import {Link} from "react-router-dom"

export default function AlumniProfileLoading() {
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
        {/* Profile Sidebar Skeleton */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                {/* Avatar Skeleton */}
                <Skeleton className="w-32 h-32 rounded-full mb-4" />

                {/* Name Skeleton */}
                <Skeleton className="h-8 w-48 mb-2" />

                {/* Job Title Skeleton */}
                <Skeleton className="h-6 w-36 mb-2" />

                {/* Company Skeleton */}
                <Skeleton className="h-5 w-40 mb-1" />

                {/* Location Skeleton */}
                <Skeleton className="h-5 w-32 mb-4" />

                <div className="w-full border-t my-4"></div>

                {/* Batch and Course Skeleton */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <Skeleton className="h-4 w-12 mb-1" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <Skeleton className="h-4 w-12 mb-1" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>

                <div className="w-full border-t my-4"></div>

                {/* Social Icons Skeleton */}
                <div className="flex space-x-2 mt-2">
                  <Skeleton className="h-9 w-9 rounded" />
                  <Skeleton className="h-9 w-9 rounded" />
                  <Skeleton className="h-9 w-9 rounded" />
                  <Skeleton className="h-9 w-9 rounded" />
                </div>

                {/* Connect Button Skeleton */}
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Skeleton */}
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
                  <Skeleton className="h-7 w-24 mb-2" />
                </CardHeader>
                <CardContent>
                  {/* Bio Skeleton */}
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-6" />

                  {/* Skills Section Skeleton */}
                  <Skeleton className="h-6 w-20 mb-3" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-16 rounded-full" />
                    <Skeleton className="h-8 w-28 rounded-full" />
                    <Skeleton className="h-8 w-22 rounded-full" />
                    <Skeleton className="h-8 w-18 rounded-full" />
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

