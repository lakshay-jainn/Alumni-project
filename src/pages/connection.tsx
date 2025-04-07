

// import { useState } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { ScrollArea } from "@/components/ui/scroll-area"

// type Users= {
//     id: number,
//     name:string,
//     username:string,
//     avatar:string,

// }

// const UserList = ({ users, actionLabel } : {users: Users[], actionLabel: string}) => (
//   <ScrollArea className="h-[300px] w-full rounded-md border p-4">
//     <div className="space-y-4">
//       {users.map((user) => (
//         <div key={user.id} className="flex items-center justify-between space-x-4">
//           <div className="flex items-center space-x-4">
//             <Avatar>
//               <AvatarImage src={user.avatar} alt={user.name} />
//               <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="text-sm font-medium leading-none">{user.name}</p>
//               <p className="text-sm text-muted-foreground">@{user.username}</p>
//             </div>
//           </div>
//           <Button variant="outline" size="sm">
//             {actionLabel}
//           </Button>
//         </div>
//       ))}
//     </div>
//   </ScrollArea>
// )

// export function SocialConnections() {
//   const [activeTab, setActiveTab] = useState("followers")
//   const [requestActiveTab,setRequestActiveTab]=useState('recieved')

//   // followers:- receiver is me, sender is someone else , status is accepted
//   const followers : Users[] = [
//     { id: 1, name: "Alice Johnson", username: "alice_j", avatar: "/avatars/01.png" },
//     { id: 2, name: "Bob Smith", username: "bob_smith", avatar: "/avatars/02.png" },
//     // Add more followers...
//   ]
//   //following:- sender is me, receiver is someone else , status is accepted
//   const following : Users[] = [
//     { id: 3, name: "Carol Williams", username: "carol_w", avatar: "/avatars/03.png" },
//     { id: 4, name: "David Brown", username: "david_b", avatar: "/avatars/04.png" },
//     // Add more following...
//   ]

//   //followRequest :- receiver is me, sender is someone else , status is pending
//   const followRequests : Users[]  = [
//     { id: 5, name: "Eve Davis", username: "eve_d", avatar: "/avatars/05.png" },
//     { id: 6, name: "Frank Miller", username: "frank_m", avatar: "/avatars/06.png" },
//     // Add more follow requests...
//   ]

//   return (
//     <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
//       <h2 className="text-2xl font-bold text-center mb-6">Social Connections</h2>
//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="followers">Followers</TabsTrigger>
//           <TabsTrigger value="following">Following</TabsTrigger>
//           <TabsTrigger value="requests">Requests</TabsTrigger>
//         </TabsList>
//         <TabsContent value="followers">
//           <UserList users={followers} actionLabel="Remove" />
//         </TabsContent>
//         <TabsContent value="following">
//           <UserList users={following} actionLabel="Unfollow" />
//         </TabsContent>
//         <TabsContent value="requests">
//             <Tabs value={requestActiveTab} onValueChange={setRequestActiveTab} className="w-full">

//                 <TabsList className="grid w-full grid-cols-2">
//                     <TabsTrigger value="recieved">Received</TabsTrigger>
//                     <TabsTrigger value="sent">Sent</TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="recieved">
//                     <UserList users={followRequests} actionLabel="Accept" />
//                 </TabsContent>

//                 <TabsContent value="sent">
//                     <UserList users={followRequests} actionLabel="Requested" />
//                 </TabsContent>

//             </Tabs>
//           {/* <UserList users={followRequests} actionLabel="Accept" /> */}
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

import { useState } from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"

type User = {
  id: number
  name: string
  username: string
  avatar: string
}

type UserListProps = {
  users: User[]
  actionLabel: string
  onAction?: (userId: number) => void
}

const UserList = ({ users, actionLabel, onAction }: UserListProps) => (
  <ScrollArea className="h-[300px] w-full rounded-md">
    <div className="space-y-3 pr-2">
      {users.map((user) => (
        <Card 
          key={user.id} 
          className="p-3 sm:p-4 hover:bg-[#95323d]/5 transition-all duration-300 transform hover:scale-[1.01] group"
        >
          <div className="flex items-center justify-between space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
              <Avatar className="h-9 w-9 sm:h-11 sm:w-11 border-2 border-[#95323d]/10 group-hover:border-[#95323d]/20 transition-colors">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-sm font-medium bg-[#95323d] text-white">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-none text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-[#95323d]/80 truncate">@{user.username}</p>
              </div>
            </div>
            <Button
              variant={actionLabel === "Requested" ? "ghost" : "outline"}
              size="sm"
              className={`min-w-[80px] sm:min-w-[90px] text-xs sm:text-sm font-medium ${
                actionLabel === "Accept" 
                  ? "bg-[#95323d] text-white hover:bg-[#95323d]/90 shadow-sm hover:shadow-[#95323d]/30" 
                  : actionLabel === "Requested"
                    ? "text-[#95323d]/60"
                    : "border-[#95323d] text-[#95323d] hover:bg-[#95323d]/5"
              } transition-all duration-200 hover:scale-105`}
              onClick={() => onAction?.(user.id)}
            >
              {actionLabel}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  </ScrollArea>
)

export function SocialConnections() {
  const [activeTab, setActiveTab] = useState("followers")
  const [requestTab, setRequestTab] = useState("recieved")
  
  // Mock state for handling follow actions
  const [followers, setFollowers] = useState<User[]>([
    { id: 1, name: "Alice Johnson", username: "alice_j", avatar: "/avatars/01.png" },
    { id: 2, name: "Bob Smith", username: "bob_smith", avatar: "/avatars/02.png" },
    { id: 7, name: "Grace Wilson", username: "grace_w", avatar: "/avatars/07.png" },
    { id: 8, name: "Henry Taylor", username: "henry_t", avatar: "/avatars/08.png" },
  ])

  const [following, setFollowing] = useState<User[]>([
    { id: 3, name: "Carol Williams", username: "carol_w", avatar: "/avatars/03.png" },
    { id: 4, name: "David Brown", username: "david_b", avatar: "/avatars/04.png" },
    { id: 9, name: "Isabel Martinez", username: "isabel_m", avatar: "/avatars/09.png" },
  ])

  const [followRequests, setFollowRequests] = useState<User[]>([
    { id: 5, name: "Eve Davis", username: "eve_d", avatar: "/avatars/05.png" },
    { id: 6, name: "Frank Miller", username: "frank_m", avatar: "/avatars/06.png" },
    { id: 10, name: "Jack Anderson", username: "jack_a", avatar: "/avatars/10.png" },
  ])

  const [sentRequests, setSentRequests] = useState<User[]>([
    { id: 11, name: "Karen Lee", username: "karen_l", avatar: "/avatars/11.png" },
    { id: 12, name: "Leo Garcia", username: "leo_g", avatar: "/avatars/12.png" },
  ])

  // Handle different actions based on context
  const handleUserAction = (userId: number, context: string) => {
    switch(context) {
      case 'followers':
        setFollowers(followers.filter(user => user.id !== userId))
        break
      case 'following':
        setFollowing(following.filter(user => user.id !== userId))
        break
      case 'accept-request':
        setFollowRequests(followRequests.filter(user => user.id !== userId))
        setFollowers(prev => [...prev, followRequests.find(user => user.id === userId)!])
        break
      case 'sent-requests':
        setSentRequests(sentRequests.filter(user => user.id !== userId))
        break
      default:
        break
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <Card className="p-4 sm:p-6 bg-white shadow-xl rounded-xl border-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-[#95323d] tracking-tight">
          Social Connections
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 h-10 sm:h-12 relative">
            {/* Tab indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#95323d]/10"></div>
            <div 
              className={`absolute bottom-0 h-[2px] bg-[#95323d] transition-all duration-300 ${
                activeTab === "followers" ? "left-0 w-1/3" : 
                activeTab === "following" ? "left-1/3 w-1/3" : 
                "left-2/3 w-1/3"
              }`}
            ></div>
            
            <TabsTrigger 
              value="followers" 
              className="py-2 text-xs sm:text-sm font-medium text-[#95323d]/80 data-[state=active]:text-[#95323d] data-[state=active]:font-semibold relative z-10"
            >
              Followers
            </TabsTrigger>
            <TabsTrigger 
              value="following" 
              className="py-2 text-xs sm:text-sm font-medium text-[#95323d]/80 data-[state=active]:text-[#95323d] data-[state=active]:font-semibold relative z-10"
            >
              Following
            </TabsTrigger>
            <TabsTrigger 
              value="requests" 
              className="py-2 text-xs sm:text-sm font-medium text-[#95323d]/80 data-[state=active]:text-[#95323d] data-[state=active]:font-semibold relative z-10"
            >
              Requests
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 sm:mt-6">
            <TabsContent value="followers">
              <UserList 
                users={followers} 
                actionLabel="Remove" 
                onAction={(id) => handleUserAction(id, 'followers')}
              />
            </TabsContent>

            <TabsContent value="following">
              <UserList 
                users={following} 
                actionLabel="Unfollow" 
                onAction={(id) => handleUserAction(id, 'following')}
              />
            </TabsContent>

            <TabsContent value="requests">
              <Tabs value={requestTab} onValueChange={setRequestTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 h-9 sm:h-10 relative mt-2">
                  {/* Inner tab indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#95323d]/10"></div>
                  <div 
                    className={`absolute bottom-0 h-[2px] bg-[#95323d] transition-all duration-300 ${
                      requestTab === "recieved" ? "left-0 w-1/2" : "left-1/2 w-1/2"
                    }`}
                  ></div>
                  
                  <TabsTrigger 
                    value="recieved" 
                    className="py-2 text-xs sm:text-sm font-medium text-[#95323d]/80 data-[state=active]:text-[#95323d] data-[state=active]:font-semibold relative z-10"
                  >
                    Received
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sent" 
                    className="py-2 text-xs sm:text-sm font-medium text-[#95323d]/80 data-[state=active]:text-[#95323d] data-[state=active]:font-semibold relative z-10"
                  >
                    Sent
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="recieved" className="mt-3 sm:mt-4">
                  <UserList 
                    users={followRequests} 
                    actionLabel="Accept" 
                    onAction={(id) => handleUserAction(id, 'accept-request')}
                  />
                </TabsContent>

                <TabsContent value="sent" className="mt-3 sm:mt-4">
                  <UserList 
                    users={sentRequests} 
                    actionLabel="Requested" 
                    onAction={(id) => handleUserAction(id, 'sent-requests')}
                  />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  )
}