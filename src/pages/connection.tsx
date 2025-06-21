
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
import { getPendingRequests,acceptRejectRequest, getFollowersFollowing, sendConnectionReq } from "@/api/services/connectionService"
type User = {
  id: string
  userId:string
  name: string
  username: string
  avatar: string
}

type UserListProps = {
  users: User[]
  actionLabel: string
  onAction?: (id: string) => void
  onReject?: (id: string) => void
  onFollowBack? : (id:string,userId: string) => void
  following?: User[] 
}
import { useEffect } from "react"
import { handleApiError } from "@/api/utils/apiUtils"
import { toast } from "sonner"

const UserList = ({ users, actionLabel, onAction,onReject,onFollowBack,following }: UserListProps) => (
  <ScrollArea className="h-[300px] w-full rounded-md">
    <div className="space-y-3 pr-2">
      {users.map((user) => (
        <Card 
          key={user.id} 
          className="p-3 sm:p-4 hover:bg-[#95323d]/5 transition-all duration-300 transform hover:scale-[1.01] group"
        >
          <div className="flex flex-wrap flex-1 gap-2 items-center justify-center xs:justify-between">
            <div className="flex flex-wrap items-center  min-w-0 justify-center gap-2">
              <Avatar className="h-9 w-9 sm:h-11 sm:w-11 border-2  border-[#95323d]/10 group-hover:border-[#95323d]/20 transition-colors">
                <AvatarImage  src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-sm font-medium bg-[#95323d] text-white">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-none text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-[#95323d]/80 truncate">@{user.username}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-wrap justify-center">
               {
                
              (actionLabel == "Accept") &&(following?.filter((fllw)=>fllw.username==user.username).length==0) && (
              <Button
              variant="ghost"
              size="sm"
              className={`min-w-[80px] sm:min-w-[90px] text-xs sm:text-sm font-medium text-[#95323d]
                    border-gray-500  border-1 hover:bg-[#95323d]/5 hover:text-[#95323d]"
              } transition-all duration-200 hover:scale-105`}
              onClick = {()=>onFollowBack?.(user.id,user.userId)}
              >Accept & Follow back</Button>  
              )
            }
              <div className="flex gap-2 flex-wrap justify-center">
            <Button
              variant={actionLabel === "Requested" ? "ghost" : "outline"}
              size="sm"
              className={`min-w-[80px] sm:min-w-[90px] text-xs sm:text-sm font-medium ${
                actionLabel === "Accept" 
                  ? "bg-[#95323d] text-white hover:bg-[#95323d]/90 shadow-sm hover:shadow-[#95323d]/30 hover:text-white" 
                  : actionLabel === "Requested"
                    ? "text-[#95323d]/60"
                    : "border-[#95323d] text-[#95323d] hover:bg-[#95323d]/5"
              } transition-all duration-200 hover:scale-105`}
              onClick={() => onAction?.(user.id)}
            >
              {actionLabel}
            </Button>
            {
              actionLabel == "Accept" && (
              <Button
              variant="ghost"
              size="sm"
              className={`min-w-[80px] sm:min-w-[90px] text-xs sm:text-sm font-medium text-[#95323d]
                    border-gray-500  border-1 hover:bg-[#95323d]/5 hover:text-[#95323d]"
              } transition-all duration-200 hover:scale-105`}
              onClick = {()=>onReject?.(user.id)}
              >Reject</Button>  
              )
            }
            </div>
            
             
            
            </div>
          </div>
        </Card>
      ))}
    </div>
  </ScrollArea>
)

export function SocialConnections() {
  const [activeTab, setActiveTab] = useState("requests")
  const [requestTab, setRequestTab] = useState("recieved")
  
  // Mock state for handling follow actions
  const [followers, setFollowers] = useState<User[]>([])

  const [following, setFollowing] = useState<User[]>([])

  const [followRequests, setFollowRequests] = useState<User[]>([])

  const [sentRequests, setSentRequests] = useState<User[]>([])

  // Handle different actions based on context
  const handleUserAction = async(Id: string, context: string) => {
    switch(context) {
      case 'followers':
        const tempFollowersTab = followers;
        try{
          setFollowers(followers.filter(user => user.id !== Id))
          await acceptRejectRequest(Id,"REJECTED");
        }catch(error){
          setFollowers(tempFollowersTab)
          const errorMsg = handleApiError(error);
          toast.error(errorMsg.message);

        }
        break
      case 'following':
          const tempFollowingTab = following;
        try{
          setFollowing(following.filter(user => user.id !== Id))
          await acceptRejectRequest(Id,"REJECTED");
        }catch(error){
          setFollowing(tempFollowingTab)
          const errorMsg = handleApiError(error);
          toast.error(errorMsg.message);

        }
        break
        
      case 'accept-request':
        const tempFollowReqAcceptTab = followRequests;
        const tempFollowersAcceptTab = followers;
        try{
          setFollowRequests(followRequests.filter(user => user.id !== Id))
          setFollowers(prev => [...prev, followRequests.find(user => user.id === Id)!])
          await acceptRejectRequest(Id,"ACCEPTED");
        }catch(error){
          setFollowRequests(tempFollowReqAcceptTab)
          setFollowers(tempFollowersAcceptTab)
          const errorMsg = handleApiError(error);
          toast.error(errorMsg.message);
          }

        break
      case 'follow-back':
        const tempReq = sentRequests;
        try{
          setSentRequests([...followRequests.filter((follw)=>follw.userId==Id),...tempReq])
          const res = await sendConnectionReq(Id)
        }
        catch(error){
          setSentRequests(tempReq)
          const errorMsg = handleApiError(error)
          toast.error(errorMsg.message)
           
              }

        break
      case 'reject-request':
        const tempFollowRequests = followRequests;
        try{
          setFollowRequests(followRequests.filter(user => user.id !== Id))
          await acceptRejectRequest(Id,"REJECTED");
        }catch(error){
          setFollowRequests(tempFollowRequests)
          const errorMsg = handleApiError(error);
          toast.error(errorMsg.message);

        }
        break
      case 'sent-requests':
        // setSentRequests(sentRequests.filter(user => user.id !== connectionId))
        break
      default:
        break
    }
  }




  useEffect(()=>{
    const fetchSocials = async() =>{
      try{
         const res = await getPendingRequests();
         const pending = res.pendingRequest;

         const incoming = pending.incoming.map((user:any)=>({
          id:user.id,
          userId:user.senderId,
          name:user.sender.username,
          username: user.sender.username,
          avatar: user.sender.profileImage,
         })) ?? [];
         const outgoing = pending.outgoing.map((user:any)=>({
          id:user.id,
          userId:user.receiverId,
          name:user.receiver.username,
          username:user.receiver.username,
          avatar: user.receiver.profileImage,
         })) ?? [];

         setFollowRequests(incoming);
         setSentRequests(outgoing);
         

      }catch(error){
        console.log(error,"nooo");
        const errorMsg = handleApiError(error);
        toast.error(errorMsg.message);
      }

      try{
         const res = await getFollowersFollowing();
         
         const followers = res.followers.map((user:any)=>({
          id:user.id,
          userId:user.senderId,
          name:user.sender.username,
          username: user.sender.username,
          avatar: user.sender.profileImage,
         })) ?? [];
         const following = res.followings.map((user:any)=>({
          id:user.id,
          userId:user.receiverId,
          name:user.receiver.username,
          username:user.receiver.username,
          avatar: user.receiver.profileImage,
         })) ?? [];

         setFollowers(followers);
         setFollowing(following);
         

      }catch(error){
        console.log(error);
        const errorMsg = handleApiError(error);
        toast.error(errorMsg.message);
      }

    }
      
    fetchSocials();
    },[])
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
                activeTab === "followers" ? "left-1/3 w-1/3" : 
                activeTab === "following" ? "left-2/3 w-1/3" : 
                "left-0/3 w-1/3"
              }`}
            ></div>
            <TabsTrigger 
              value="requests" 
              className="py-2 text-xs sm:text-sm font-medium text-[#95323d]/80 data-[state=active]:text-[#95323d] data-[state=active]:font-semibold relative z-10"
            >
              Requests
            </TabsTrigger>
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

          </TabsList>

          <div className="mt-4 sm:mt-6">
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
                    onReject={(id) => handleUserAction(id, 'reject-request')}
                    onFollowBack={(id,userId)=> {handleUserAction(id, 'accept-request');handleUserAction(userId,'follow-back')}}
                    following={following}
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

            
          </div>
        </Tabs>
      </Card>
    </div>
  )
}