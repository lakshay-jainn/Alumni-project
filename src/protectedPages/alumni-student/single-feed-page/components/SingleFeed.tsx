import useFetchSingleFeed from "@/api/hooks/useFetchSingleFeed";
import { SinglePost } from "@/protectedPages/alumni-student/feeds-page/components/SinglePost";
import { InitialCommentsResponse } from "@/api/types/FeedsTypes";
import Comments from "./Comments"
import SkeletonCard from "@/components/ui/SkeletonCard";

function SingleFeed({postId} : {postId : (string | undefined)}){
    const [singleFeed,loading,error]=useFetchSingleFeed({postId});


    if(loading){
        return(<div className="container mx-auto py-2 space-y-8 relative">
                  <SkeletonCard hasImage={true} />  
              </div>)
    }
    if(error){
        return <div>{error}</div>
    }
    if (!singleFeed){
        return <div>Post not found</div>
    }
    if (!loading && !error){
      

        const comments = singleFeed.comments?.map((comment:InitialCommentsResponse) => ({
          id: comment.id,
          author: comment.user.username, 
          avatar: comment.user.profileImage,
          content: comment.comment,
          timestamp: comment.createdAt, 
          likes: comment.likesCount,
          isLiked: comment.isLiked,
          type:'comment'
          
        })) || []
        
         const post ={
            id:singleFeed.id,
            author:{
              name:singleFeed.user.profile.basic.firstName + " " + (singleFeed.user.profile.basic.lastName && singleFeed.user.profile.basic.lastName ) ,
              avatar:singleFeed.user.profileImage,
    
            },
            timestamp:singleFeed.createdAt,
            image:singleFeed.content!=='' ? singleFeed.content : undefined,
            caption: singleFeed.caption ? singleFeed.caption : '',
            likes:singleFeed.likesCount,
            commentsCount:singleFeed.commentCount,
            isLiked:singleFeed.isLiked,
            community:singleFeed.Community,
            comments:comments.filter((comment:any)=>comment.type==='comment') || [],
            whisperComments:comments.filter((comment:any)=>comment.type==='whisper') || []
          }       
          console.log(comments,post)
          
          
          return( 
            <div className="p-5 flex flex-col gap-5 w-full">
          <SinglePost key={post.id} {...post} />
          <Comments initialComments={post.comments} post={post}/>
          </div>
          )

    }
    
}
export default SingleFeed;