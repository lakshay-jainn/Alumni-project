import { useState,useEffect } from "react"
import { useLocation,useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card,  CardHeader } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
import { Heart,MessageSquareText } from "lucide-react"
import { LikePost } from "@/api/services/feedsService"
import {toast} from 'sonner'
import useGlobalAuth from "@/Auth/useGlobalAuth"
import { Trash2 } from "lucide-react"

import DeletePost from "./deletePostModal"





export interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
}

export interface PostProps {
  id: string
  author: {
    name: string
    avatar: string
  },
  commentsCount:number
  timestamp: string,
  image?: string
  caption: string
  likes: number
  isLiked: boolean
  community:{
    name:string,
    description:string
  }
  comments?: Comment[]
}




//single comment

export function SinglePost({
  id,
  author,
  image,
  timestamp,
  caption,
  likes: initialLikes,
  isLiked: initialIsLiked,
  commentsCount: initialCommentsCount,
  community
}: PostProps) {
  const {role} = useGlobalAuth()
  const location = useLocation()
  const navigate=useNavigate()
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [SuccessfullIsLike, setSuccessfullIsLike] = useState(initialIsLiked)
  const [pendingLike, setPendingLike] = useState<boolean | null>(null)
  const [openDeleteModal,setOpenDeleteModal] = useState(false)
  // const lastTouchTimeRef = useRef<number>(0);
  const isTextOnly = !image


  useEffect(() => {
    if (pendingLike === null) return;
    const timeout = setTimeout(async () => {
      if (isLiked !== SuccessfullIsLike) {
        await LikeUpdate();
      }
    },1000);
    return () => clearTimeout(timeout);
  }, [pendingLike]);

   const toggleLike = () =>{
    setPendingLike((prev) => (prev === null || prev===false) ? true : false)
    setIsLiked((prev) => !prev)
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1))
    
    
   }
   const LikeUpdate = async () => {
    try{
      const responseData= await LikePost({postId:id});
      setSuccessfullIsLike(responseData.isLiked)
      console.log('like updated',responseData.isLiked)
    }
    catch{
      toast.error('some error occured in liking the post')
      setIsLiked((prev) => !prev)
      setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1))
    }
    
  }


  const PostClick=()=>{
    const currentPath = location.pathname;
    if (currentPath.includes('feed/'+id) ) {
      return;
    }
    if (currentPath.startsWith("/admin/feeds")) {
      navigate(`/admin/feed/${id}`, { replace: true });
    } else if (currentPath.startsWith("/feeds")) {
      navigate(`/feed/${id}`, { replace: true });
    }
  

  }
  const handleDelete = ()=>{
    setOpenDeleteModal(true)
  }
  // const handleDoubleClick = useCallback(() => {
  //   toggleLike();
  // }, [toggleLike]);

  // const handleTouchEnd = useCallback(() => {
  //   const now = Date.now();
  //   // If two taps occur within 300ms, register as a double tap
  //   if (now - lastTouchTimeRef.current < 300) {
  //     toggleLike();
  //   }
  //   lastTouchTimeRef.current = now;
  // }, [toggleLike]);

  


  return (
    <>
    {
      role==="ADMIN" && <DeletePost postId={id} open={openDeleteModal} setOpen={setOpenDeleteModal}/>
    }
    
    {/*max-w-[1095px]*/}
    {/* onDoubleClick={handleDoubleClick} onTouchEnd={handleTouchEnd} */}
    {/* w-full mx-auto */}
    <Card  className={` max-h-max flex flex-col rounded-[2rem] border-2`}>
      <CardHeader className="flex flex-row items-center gap-4 border-b-2 pb-4 space-y-0">
      
        <Avatar>
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="font-semibold">{author.name}</p>
        <div className="flex flex-col">
          {/* <p className="font-semibold">{author.name}</p> */}
          {/* <p className="text-sm text-muted-foreground">{author.role}</p> */}
        </div>
       

        <div className="ml-auto flex items-center gap-2">
           <p className="">{timestamp.slice(0,10)}</p>
        <span className="rounded-2xl border-1 py-1 px-2 text-white bg-red-800">{community.name}</span>
       
        {/* {showAllCommen  ts && !isTextOnly && (
          <Button variant="ghost" size="icon" onClick={toggleComments} className="ml-auto lg:hidden">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )} */}
                  {
            role === "ADMIN" && (
              <button onClick={handleDelete} className="rounded-xl bg-red-400 px-3 py-1 text-white ml-3"><Trash2 className="inline"/> <span className="inline-block h-full">Delete</span></button>
            )
          }
        </div>
      </CardHeader>
      {/* h-full */}
      <div className={`flex flex-col cursor-pointer flex-1 align-center`}>
        
        <div onClick={PostClick} className={`p-4`}>
            <p className="text-xl mb-4">{caption}</p>
        </div>
        {!isTextOnly && (
         
          <img
            src={image || "/img_avatar.png"}
            alt="Post image"
            onClick={PostClick}
            style={{maxWidth:"auto"}}
            className="object-contain max-h-[60vh]"
            // className="h-auto object-cover"
          />
       
        
        ) }
      
      
          
        
        
        <div className="p-4 border-t-2">
                <div className="flex items-center justify-between w-full ">
                  <div className="flex items-center gap-5">


                    <Button variant="ghost" size="icon" onClick={PostClick} className="hover:bg-inherit w-full h-full text-start cursor-pointer">
                      <MessageSquareText style={{height:"2rem",width:"2rem"}}  strokeWidth={1} className="" />
                      <span className="text-lg font-semibold">{initialCommentsCount}</span>
                    </Button>
                
                    <Button
                    className="hover:bg-inherit w-full h-full text-start cursor-pointer"
                      variant="ghost"
                      size="icon"
                      onClick={()=> toggleLike() }
                      aria-label={isLiked ? "Unlike" : "Like"}
                      aria-pressed={isLiked}
                    >
                      <Heart style={{height:"2rem",width:"2rem"}} strokeWidth={1} className={` ${isLiked ? "animate-smooth-bounce fill-red-800 text-red-800 " : ""}`} />
                      <span className="text-lg font-semibold  ">{likes}</span>
                    </Button>
            

                
                  </div>
                  <span className="text-sm font-semibold">{likes} likes</span>
                </div>

                
                
          </div>

      </div>
    </Card>


      </>
  )
}



