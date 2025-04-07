import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {memo,useState,useMemo} from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Comment } from "@/protectedPages/alumni-student/feeds-page/components/SinglePost";
import { Button } from "@/components/ui/button"
import AddCommentElement from "./CommentBtn";
import {  ThumbsUp } from "lucide-react"
import {z} from 'zod'
import { AddComment } from "@/api/services/feedsService";
import { FetchComments } from "@/api/services/feedsService";
import { handleApiError } from "@/api/utils/apiUtils";
import { toast } from "sonner";
import { LikeComment } from "@/api/services/feedsService";
import { useEffect } from "react";
const messageSchema = z.object({
    text: z
        .string()
        .min(1, "Message cannot be empty")
      
        // .refine((text) => , {
        //     message: "Profanity is not allowed!",
        // }),
});


export type AddMessageValues = z.infer<typeof messageSchema>

const CommentItem = memo(({ comment }: { comment: Comment }) => {
  const [commentLikes, setCommentLikes] = useState(comment.likes)
  const [isLiked, setIsLiked] = useState(comment.isLiked)
  const [SuccessfullIsCommentLike, setSuccessfullIsCommentLike] = useState(comment.isLiked)
  const [pendingCommentLike, setPendingCommentLike] = useState<boolean | null>(null)
  const { id } = comment
  useEffect(() => {
    if (pendingCommentLike === null) return;
    const timeout = setTimeout(async () => {
      if (isLiked !== SuccessfullIsCommentLike) {
        await LikeUpdate();
      }
    },1000);
    return () => clearTimeout(timeout);
  }, [pendingCommentLike]);

   const toggleLike = () =>{
    setPendingCommentLike((prev) => (prev === null || prev===false) ? true : false)
    setIsLiked((prev) => !prev)
    setCommentLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1))
   }
   const LikeUpdate = async () => {
    try{
      const responseData= await LikeComment({commentId :id});
      setSuccessfullIsCommentLike(responseData.isLiked)
      console.log('like updated',responseData.isLiked)
    }
    catch{
      toast.error('some error occured in liking the post')
      setIsLiked((prev) => !prev)
      setCommentLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1))
    }
    

  }
    return (
      <div className="flex items-start gap-2 border-2 rounded-2xl p-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment.avatar} alt={comment.author} />
          <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{comment.author}</p>
            <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
          </div>
          <p className="text-sm">{comment.content}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleLike()}
            className="text-xs mt-1 p-0 h-auto"
          >
            <ThumbsUp className={`h-3 w-3 mr-1 ${isLiked ? "fill-red-800 text-red-800" : ""}`} />
            {commentLikes} {commentLikes === 1 ? "like" : "likes"}
          </Button>
        </div>
      </div>
    );
  } )
  
  
  
  //whole comments list
const CommentsList = memo(({ sortedComments  }: 
    { sortedComments: Comment[] }) => {
        
    
      return (
        <div className="space-y-4">
          {sortedComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
  
            />
          ))}
        </div>
      );
    });
  
  

  





        function Comments({initialComments,post}:{initialComments:any,post:any}) {
          
          const [comments, setComments] = useState<Comment[]>(initialComments)
          const [sortBy, setSortBy] = useState<"recent" | "likes">("recent")
          const [skipComments, setSkipComments] = useState(0);
          const [isCommentsExpanded, setIsCommentsExpanded] = useState(false)
          
          const form = useForm<AddMessageValues>({
                resolver: zodResolver(messageSchema),
                mode: "onSubmit",
                reValidateMode: "onSubmit",
              });

              
          const loadMoreComments = async() => {
                  try{
                    setSkipComments((prev)=> prev+5)
                    console.log(`/posts/comments?postId=${post.id}${"&skip=" + String(skipComments+5)}&take=5`)
                    const responseData=await FetchComments(`/posts/comments?postId=${post.id}${"&skip=" + String(skipComments+5)}&take=5`);
                 
                    const CmmtsFromDb=responseData.comments;
                    console.log("asasdfasdf",CmmtsFromDb);
                    const newCommentObj = CmmtsFromDb.map((CmmtFromDb : any)=> (
                      {id:CmmtFromDb.id,
                      author: CmmtFromDb.user.username,
                      avatar: CmmtFromDb.user.profileImage,
                      content: CmmtFromDb.comment,
                      likes : CmmtFromDb.likesCount,
                      isLiked:CmmtFromDb.isLiked,
                      timestamp : CmmtFromDb.createdAt}
                    ));
              
              
                    const TotalCommts=[...comments,...newCommentObj]
                    const uniqueComments = [...new Map(TotalCommts.map(cmmts => [cmmts.id, cmmts])).values()];
                   
                    
                    setComments([...uniqueComments])
                    
                    console.log(newCommentObj);
                    if (newCommentObj.length===0) {
                      setIsCommentsExpanded(true)
                    }
                  }catch{
              
                  }
                  
                }
            const sortedComments =  
            useMemo(() => {
              return [...comments].sort((a, b) => 
                sortBy === "likes" 
                  ? b.likes - a.likes 
                  : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
              );
            }, [comments, sortBy]); 
                  

          
            const handleAddComment = async (data:any,clickButton : string) => {
                  if (clickButton === "Whisper") {
                    console.log("Whispering...")
                  }
                  else {
                    console.log("Commentting...")
                  }
                  const newComment: string=data.text;
                  const now=Date.now()
                  const currentDate=new Date(now)
                  const options : any = { year: 'numeric', month: 'long', day: 'numeric' };
                  const formattedDate = currentDate.toLocaleDateString('en-US', options);
                  

                  try{
                      const response = await AddComment({content:newComment,postId:post.id});
                      const CommentFromDb = response.comment;
                      
                      const newCommentObj={
                        id:CommentFromDb.id,
                        author: CommentFromDb.user.username,
                        avatar: CommentFromDb.user.profileImage,
                        content: newComment,
                        likes : 0,
                        isLiked:false,
                        timestamp : formattedDate,
                      }
                      
                      setComments([newCommentObj, ...comments])
                      form.reset();
                      toast.success("Your comment has been added and no toxicity detected!", {
                        className: "bg-green-500 text-white font-bold",
                      });
                    }catch (error){
                      const errorMessage=handleApiError(error)
                      toast.error(errorMessage.message)
                      
                    } 
              
                    
                    
                }
            
              
            return (
               
                    <div className="flex flex-col gap-5">
                    <AddCommentElement form={form} handleAddComment={handleAddComment} />
                          {/* <div className="">
                                
                                <div className="flex justify-between items-center mb-4">
                                  <div className="flex items-center gap-2">
                                  
                                    <h3 className="text-lg font-semibold">Whisper Comments </h3>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => setWhisperSortBy("recent")}>
                                      Recent
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setWhisperSortBy("likes")}>
                                      Top
                                    </Button>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <CommentsList toggleCommentLike={toggleWhisperCommentLike} sortedComments={sortedWhisperComments} />
                                </div>
                                {!isWhisperCommentsExpanded ? (
                                  <Button variant="outline" className="w-full mt-4" onClick={loadMoreWhisperComments}>
                                    Load more Whisper comments
                                  </Button>
                                ): <p>No more Whisper Comments To show</p>}
                              </div> */}
                              <div className="flex flex-col overflow-hidden rounded-2xl border-2 p-4">
                                
                                <div className="flex justify-between items-center mb-4 ">
                                  <div className="flex items-center gap-2">
                                  
                                    <h3 className="text-lg font-semibold">Comments </h3>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => setSortBy("recent")}>
                                      Recent
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setSortBy("likes")}>
                                      Top
                                    </Button>
                                  </div>
                                </div>
                                <div className="space-y-4 overflow-y-auto ">
                                  <CommentsList sortedComments={sortedComments} />
                                </div>
                                {!isCommentsExpanded  ? (
                                  <Button variant="outline" className="w-full mt-4" onClick={loadMoreComments}>
                                    Load more comments
                                  </Button>
                                ): <p>No more Comments To show</p>}
                              </div>
                              </div>
                            )}
            
          


export default Comments;