import useFetchFeeds from "@/api/hooks/useFetchFeeds";
import { InitialFeedsResponse } from "@/api/types/FeedsTypes";
import { useState,useEffect , useCallback} from "react";
import { PostProps } from "./SinglePost";
import { SinglePost } from "./SinglePost";
import { FetchFeeds } from "@/api/services/feedsService";
import { debounce } from 'lodash'
import SkeletonCard from "@/components/ui/SkeletonCard";


export default function Feeds({fetchAgain,communities}:{fetchAgain:boolean,communities:string[]}) {
  const [feeds,setFeeds,loading,error]=useFetchFeeds({fetchAgain,communities});
  const [feedsExpanded,setFeedsExpanded]=useState(false);
  const [skipFeeds,setSkipFeeds]=useState(0);
  const [scrollLoading,setScrollLoading]=useState(false);
  const [page, setPage] = useState(1);


  const handleScroll = () => {
    
    if (
      document.body.scrollHeight - 50 < window.scrollY + window.innerHeight
    ) {
      console.log('reached the end niggaddsfsdfsdfsdf')
      setScrollLoading(true);
    }
  };
  const debouncedHandleScroll = useCallback(debounce(handleScroll, 500), [handleScroll]);
  useEffect(() => {
    if (!feedsExpanded) {
        window.addEventListener('scroll', debouncedHandleScroll);
    } else {
        window.removeEventListener('scroll', debouncedHandleScroll);
    }

    // Clean up the event listener on component unmount
    return () => {
        window.removeEventListener('scroll', debouncedHandleScroll);
    };
}, [feedsExpanded, debouncedHandleScroll]);

 
  const loadMoreFeeds = async() => {
          
              setSkipFeeds((prev)=> prev+15)
              let url;
              
              if (!communities.includes("Connections")) {
                    url=`/posts?skip=${skipFeeds+15}&take=15&communities=${communities}`
                }
                else {
                    let justCommunities = communities.filter((comm) => comm!="Connections")
                    url=`/posts?skip=${skipFeeds+15}&take=15&communities=${justCommunities}&onlyConnections=true`
                  
                }
            
              const responseData=await FetchFeeds(url);
              const PostsFromDb=responseData.posts;
              console.log('posts from db',PostsFromDb)
              

              
              
              setScrollLoading(false)
              setFeeds({posts:[...feeds.posts,...PostsFromDb]})
                      
                      
              if (PostsFromDb.length===0) {
                
                setFeedsExpanded(true)
              }
      }

    useEffect(()=>{
      console.log('page',page)
      if(page>1){
        loadMoreFeeds();
      }
      
    },[page])
    useEffect(() => {
      console.log('scrollLoading',scrollLoading)
        if (scrollLoading == true) {
          setPage((prev)=>prev+1)
        }
      }, [scrollLoading]);


    if (loading){
        return(<div className="container mx-auto py-2 space-y-8 relative">
          <SkeletonCard hasImage={true} />  
          <SkeletonCard hasImage={true} />
          <SkeletonCard hasImage={true} />
      </div>)
      
    }
  if (!loading && error){
    console.error(error);
  }
  if(!loading && !error){

    if (!feeds || feeds.posts.length===0){
      return (
        <div className="mx-auto flex justify-center items-center h-96">
          <h1 className="text-3xl font-bold text-gray-500">No posts to show</h1>
          </div>)
    }
    

  return (
    <>
    <section className="container mx-auto py-2 space-y-8 relative">

      {feeds.posts.map((feed:InitialFeedsResponse) => {
        
        const post: PostProps={
          id:feed.id,
          author:{
            name:feed.user.profile.basic.firstName + " " + (feed.user.profile.basic.lastName && feed.user.profile.basic.lastName ) ,
            avatar:feed.user.profileImage,
          },
          timestamp:feed.createdAt,
          image:feed.content!=='' ? feed.content : undefined,
          caption: feed.caption ? feed.caption : '',
          likes:feed.likesCount,
          isLiked:feed.isLiked,
          commentsCount:feed.commentCount,
          community:feed.Community
        }       
        console.log(feed);
        return(<SinglePost key={post.id} {...post} />)
  }
  )}
  
    {scrollLoading && <div className="text-center p-4 gradient-border border-1 rounded-xl   ">Loading...</div>}
    {feedsExpanded &&         <div className="flex justify-center items-center h-12 pb-5">
          <h1 className="text-3xl font-bold text-gray-500">No more posts to show</h1>
          </div>}
    </section>
    </>
  )
}
}

