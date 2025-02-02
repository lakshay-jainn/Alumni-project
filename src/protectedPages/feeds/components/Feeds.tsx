import { Post } from "@/protectedPages/feeds/components/post";
import useFetchFeeds from "@/api/hooks/useFetchFeeds";
import { InitialCommentsResponse,InitialFeedsResponse } from "@/api/types/FeedsTypes";
import { PostProps } from "@/protectedPages/feeds/components/post";
import {SquarePlus} from 'lucide-react';
import { Link } from "react-router-dom";


export default function Feeds() {
  const [feeds,loading,error]=useFetchFeeds();
  if (!loading && error){
    console.error(error);
  }
  if(!loading && !error){
    

  return (
    <>
    <Link to='./create'>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-[1095px] mx-auto px-5 py-3 flex justify-between font-bold ">
                Create a new Post
                <SquarePlus />
            </div>
      </Link>

    <section className="container mx-auto py-2   ">




      {feeds.posts.map((feed:InitialFeedsResponse) => {
        
        const post: PostProps={
          id:feed.id,
          author:{
            name:feed.user.username ,
            avatar:feed.user.profileImage,
            role:feed.user.role,
          },
          timestamp:feed.createdAt,
          image:feed.content!=='' ? feed.content : undefined,
          caption: feed.caption ? feed.caption : '',
          likes:feed.likesCount,
          isLiked:feed.isLiked,
          comments:feed.comments?.map((comment:Partial<InitialCommentsResponse>) => ({
            id: comment.id,
            author: comment.user.username, 
            avatar: comment.user.profileImage,
            content: comment.comment,
            timestamp: '  ', 
            likes: comment.likesCount,
            isLiked: comment.isLiked
          })) || [],


  
        }       

        return( <Post key={post.id} {...post} />)
  })}
    </section>
    </>
  )
}
}

