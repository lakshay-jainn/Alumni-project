import { useParams } from "react-router-dom";
import SingleFeed from "./components/SingleFeed";
// import { router } from "@/routes";


function SingleFeedPage(){
    const { postId } = useParams();
    return (
        <div className=" flex-1 pt-5 px-5 flex overflow-hidden">
            <SingleFeed postId={postId} />
        </div>
        
    )
}

export default SingleFeedPage;
