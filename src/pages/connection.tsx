

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

type Users= {
    id: number,
    name:string,
    username:string,
    avatar:string,

}

const UserList = ({ users, actionLabel } : {users: Users[], actionLabel: string}) => (
  <ScrollArea className="h-[300px] w-full rounded-md border p-4">
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            {actionLabel}
          </Button>
        </div>
      ))}
    </div>
  </ScrollArea>
)

export function SocialConnections() {
  const [activeTab, setActiveTab] = useState("followers")
  const [requestActiveTab,setRequestActiveTab]=useState('recieved')

  // followers:- receiver is me, sender is someone else , status is accepted
  const followers : Users[] = [
    { id: 1, name: "Alice Johnson", username: "alice_j", avatar: "/avatars/01.png" },
    { id: 2, name: "Bob Smith", username: "bob_smith", avatar: "/avatars/02.png" },
    // Add more followers...
  ]
  //following:- sender is me, receiver is someone else , status is accepted
  const following : Users[] = [
    { id: 3, name: "Carol Williams", username: "carol_w", avatar: "/avatars/03.png" },
    { id: 4, name: "David Brown", username: "david_b", avatar: "/avatars/04.png" },
    // Add more following...
  ]

  //followRequest :- receiver is me, sender is someone else , status is pending
  const followRequests : Users[]  = [
    { id: 5, name: "Eve Davis", username: "eve_d", avatar: "/avatars/05.png" },
    { id: 6, name: "Frank Miller", username: "frank_m", avatar: "/avatars/06.png" },
    // Add more follow requests...
  ]

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Social Connections</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="followers">
          <UserList users={followers} actionLabel="Remove" />
        </TabsContent>
        <TabsContent value="following">
          <UserList users={following} actionLabel="Unfollow" />
        </TabsContent>
        <TabsContent value="requests">
            <Tabs value={requestActiveTab} onValueChange={setRequestActiveTab} className="w-full">

                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="recieved">Received</TabsTrigger>
                    <TabsTrigger value="sent">Sent</TabsTrigger>
                </TabsList>

                <TabsContent value="recieved">
                    <UserList users={followRequests} actionLabel="Accept" />
                </TabsContent>

                <TabsContent value="sent">
                    <UserList users={followRequests} actionLabel="Requested" />
                </TabsContent>

            </Tabs>
          {/* <UserList users={followRequests} actionLabel="Accept" /> */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

