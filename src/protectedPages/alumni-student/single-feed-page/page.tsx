import { useParams } from "react-router-dom";
import SingleFeed from "./components/SingleFeed";
// import { router } from "@/routes";


function SingleFeedPage(){
    const { postId } = useParams();
    return (
        <div className="w-full flex-1 pt-5 px-5 flex max-w-[50rem] ">
            <SingleFeed postId={postId} />
        </div>
        
    )
}

export default SingleFeedPage;
